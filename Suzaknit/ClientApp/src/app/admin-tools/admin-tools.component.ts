import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { TranslationManagerComponent } from './translation-manager/translation-manager.component';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.css'],
  providers: [DialogService]
})
export class AdminToolsComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  showImages() {
    const ref = this.dialogService.open(ImageUploaderComponent, {
      header: 'Choose a Car',
      width: '70%'
    });
  }

  showTranslation() {
    const ref: DynamicDialogRef = this.dialogService.open(TranslationManagerComponent, {
      header: 'Translation Manager',
      width: '90%',
      style: { "direction": "ltr" },
      contentStyle: { "min-height": "300px" }
    });
  }

}
