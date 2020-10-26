import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { forkJoin } from 'rxjs';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.css']
})
export class AdminToolsComponent implements OnInit {
  attachments: any[];
  @ViewChild('fileInput') fileInput: FileUpload; 

  constructor(private uploadService: UploadService) {
  }

  ngOnInit() {
  }

  onSubmit(): void {
    const promiseList = [];
    const ObservableList = [];
    this.fileInput.files.forEach(file => {
      promiseList.push(this.uploadService.uploadFile(file));
    });
    //call delete function here in case of delete
    //this.uploadService.deleteAttachment(this.deletedattachments);
    if (promiseList.length) {
      forkJoin(promiseList).subscribe(
        files => {
          const date = new Date();
          files.forEach(file => {
            this.attachments.push({
              originalname: file['originalname'],
              uploadname: file['uploadname'],
              uploadtime: date.getDate()
            });
          });
          //Do form save here after uploading
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  //Maintain delete list
  deleteFile(list, index) {
    //this.deletedattachments.push(this.attachments[index]);
    this.attachments.splice(index, 1);
  }

}
