import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { FileUpload } from 'primeng/fileupload';
import { Image } from '../models/image';
import { EImageCategory } from '../models/image-category';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.css']
})
export class AdminToolsComponent implements OnInit {
  attachments: any[] = [];

  constructor(private uploadService: UploadService) {
  }

  ngOnInit() {
  }

  onUpload = (event, fileInput: FileUpload): void => {
    this.uploadService.uploadFiles(event.files, EImageCategory.pupets).subscribe((files: Image[]) => {
      const date = new Date();
      files.forEach(file => {
        this.attachments.push({
          name: file['name'],
          category: file['category'],
          uploadtime: date.getDate()
        });
      })

      fileInput.clear();

      // Message for successful upload

    },
      err => {
        console.log(err);
      }
    );
  }

  //Maintain delete list
  deleteFile(list, index) {
    //this.deletedattachments.push(this.attachments[index]);
    this.attachments.splice(index, 1);
  }
}
