import { Component, OnInit } from '@angular/core';
import { AdminToolsService } from '../../services/admin-tools.service';
import { concat, merge, forkJoin } from 'rxjs';

@Component({
  selector: 'app-translation-manager',
  templateUrl: './translation-manager.component.html',
  styleUrls: ['./translation-manager.component.css']
})
export class TranslationManagerComponent implements OnInit {

  files: { en: JSON, he: JSON };

  cols: any[];

  constructor(private adminService: AdminToolsService) { }

  ngOnInit() {
    forkJoin({
      en: this.adminService.getTranslationData('en'),
      he: this.adminService.getTranslationData('he')
    }).subscribe(data => {
      this.files = data;
      })

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'he', header: 'He' },
      { field: 'en', header: 'En' }
    ];
  }
}
