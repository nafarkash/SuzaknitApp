import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EImageCategory } from '../models/image-category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminToolsService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getTranslationData(translationLang: string): Observable<JSON> {
    return this.http.get<JSON>(this.baseUrl + `i18n/${translationLang}.json`);
  }

  setTranslation(jsonData) {
    return this.http.post(this.baseUrl + 'api/translation/upload', jsonData);
  }

  //upload file method
  uploadFiles(files: File[], category: EImageCategory) {
    const formData: FormData = new FormData();
    formData.append('category', category.toString());
    files.forEach(file => formData.append('file', file, file.name));
    //append any other key here if required
    return this.http.post(this.baseUrl + 'api/image/upload', formData);
  }
  //delete file method
  deleteAttachment(deleteList: Array<any>) {
    if (deleteList.length) {
      //for multiple delete do foreach here
      const body = { filename: deleteList[0].uploadname };
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'blob'
      };
      //return this.http.post(`<delete file api>`, body, options);
      return this.http.post(`<delete file api>`, body);
    }
  }
  //Download file 
  downloadFile = function (list, index) {
    const body = { filename: list[index].uploadname };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/pdf' }),
      responseType: 'blob'
    };
    this.http.post(`<api URL>`, body, options).subscribe(data => {
      this.saveFile(data, list[index].uploadname);
      const blob = new Blob([data], { type: 'application/pdf' });
      var filename = list[index].uploadname;
      var result = filename.match('.pdf');
      if (result) {
        var blobURL = URL.createObjectURL(blob);
        window.open(blobURL);
      } else {
        //saveAs(blob, filename);
      }
    });
  };
}
