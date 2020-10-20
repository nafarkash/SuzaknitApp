import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  constructor() { }

  public updateTheme(theme: Themes) {
    document.getElementById('theme').setAttribute('href', `assets/themes/${theme}/theme.css`)
  }
}

export enum Themes {
  aryaBlue = 'arya-blue',
  aryaGreen = 'arya-green',
  aryaOrange = 'arya-orange',
  aryaPurple = 'arya-purple',
  bootstrapDarkBlue = 'bootstrap4-dark-blue',
  bootstrapDarkPurple = 'bootstrap4-dark-purple',
  bootstrapLightBlue = 'bootstrap4-light-blue',
  bootstrapLightPurple = 'bootstrap4-light-purple',
  fluentLight = 'fluent-light',
  lunaAmber = 'luna-amber',
  lunaBlue = 'luna-blue',
  lunaGreen = 'luna-green',
  lunaPink = 'luna-pink',
}
