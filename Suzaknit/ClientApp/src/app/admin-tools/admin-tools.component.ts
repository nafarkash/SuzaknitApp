import { Component, OnInit } from '@angular/core';
import { AdminToolsService } from '../services/admin-tools.service';
import { FileUpload } from 'primeng/fileupload';
import { Image } from '../models/image';
import { EImageCategory } from '../models/image-category';
import { SelectItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.css']
})
export class AdminToolsComponent implements OnInit {
  attachments: any[] = [];
  galleryCategories: SelectItem<EImageCategory>[];
  selectedCategory: EImageCategory;

  constructor(private adminToolsService: AdminToolsService, private translate: TranslateService) {
    this.translate.onLangChange.subscribe(() => this.buildCategoryDropdown());
  }

  ngOnInit() {
    this.buildCategoryDropdown();
  }

  onUpload = (event, fileInput: FileUpload): void => {
    this.adminToolsService.uploadFiles(event.files, this.selectedCategory).subscribe((files: Image[]) => {
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

  private buildCategoryDropdown() {
    this.galleryCategories = [
      { label: this.translate.instant('galleryCategories.cactus'), value: EImageCategory.cactus },
      { label: this.translate.instant('galleryCategories.drawings'), value: EImageCategory.drawings },
      { label: this.translate.instant('galleryCategories.public_work'), value: EImageCategory.monuments },
      { label: this.translate.instant('galleryCategories.orchids'), value: EImageCategory.orchids },
      { label: this.translate.instant('galleryCategories.pupets'), value: EImageCategory.pupets }]
  }
}
