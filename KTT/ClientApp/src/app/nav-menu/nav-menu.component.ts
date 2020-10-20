import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  items: MenuItem[];
  userName: string;
  password: string;

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe(() => this.buildNavMenu());
  }

  ngOnInit() {
    this.buildNavMenu();
  }

  buildNavMenu() {
    this.items = [
      {
        label: this.translate.instant('nav.choose_language'),
        items: [
          { label: this.translate.instant('nav.lang.hebrew'), command: () => this.translate.use('he') },
          { label: this.translate.instant('nav.lang.english'), command: () => this.translate.use('en') }
        ]
      },
      {
        label: this.translate.instant('nav.choose_theme'),
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: this.translate.instant('nav.theme.dark_green'), icon: 'pi pi-fw pi-trash' },
          { label: this.translate.instant('nav.theme.light_blue'), icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];
  }
}
