import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(@Inject(DOCUMENT) private document, private translate: TranslateService) {
    // Set initial direction
    this.changeDirection(translate.currentLang);

    // Listen to language change and update direction if needed
    translate.onLangChange.subscribe((event) => {
      this.changeDirection(event.lang);
    });
  }

  changeDirection(language: string) {
    const lang = language;
    const ltrrtl = lang === 'he' ? 'rtl' : 'ltr';

    document.getElementsByTagName("html")[0].setAttribute('lang', lang);
    document.getElementsByTagName("body")[0].setAttribute('dir', ltrrtl);
  }
}
