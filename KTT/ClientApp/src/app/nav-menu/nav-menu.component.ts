import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ThemesService, Themes } from '../services/themes.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  items: MenuItem[];
  userName: string;
  password: string;

  constructor(private translate: TranslateService, private themeService: ThemesService) {
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
        items: this.createThemes()
      }
    ];
  }

  createThemes(): MenuItem[] {
    return Object.keys(Themes).map(key => <MenuItem>{
      label: this.translate.instant(`nav.theme.${key}`),
      command: () => this.themeService.updateTheme(Themes[key as keyof typeof Themes]),
    })
  }
}
