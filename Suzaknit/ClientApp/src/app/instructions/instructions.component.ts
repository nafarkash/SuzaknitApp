import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MetadataService } from '../services/metadata.service';
import { InstructionsMetadata } from '../models/instructions-metadata';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  items: InstructionsMetadata[];

  constructor(private translate: TranslateService, private metadataService: MetadataService) {
    this.translate.onLangChange.subscribe(() => this.buildInstructionsMenu());
  }


  ngOnInit() {
    this.buildInstructionsMenu();
  }

  private buildInstructionsMenu() {
    this.metadataService.getInstructions().subscribe(instructions => this.items = instructions);
  }

  //private buildInstructionsMenu() {
  //  this.items = [
  //    {
  //      label: this.translate.instant('instructions.nav.basics'),
  //      items: [
  //        { label: this.translate.instant('instructions.nav.magic_ring'), command: () => this.updateVideo('wMmXMAJbcF4') },
  //        { label: this.translate.instant('instructions.nav.half_page'), command: () => this.updateVideo('pgie7cQrDY8') },
  //        { label: this.translate.instant('instructions.nav.closure'), command: () => this.updateVideo('upnaxBUQVMA') },
  //        { label: this.translate.instant('instructions.nav.reduction'), command: () => this.updateVideo('GTmIM7SugoM') }
  //      ]
  //    },
  //    {
  //      label: this.translate.instant('instructions.nav.cactus_with_flower'),
  //      items: [
  //        { label: this.translate.instant('instructions.nav.cactus'), command: () => this.updateVideo('zvFoz-PpQ-I') },
  //        { label: this.translate.instant('instructions.nav.flower'), command: () => this.updateVideo('9Veo7i1XkRo') },
  //      ]
  //    },
  //    {
  //      label: this.translate.instant('instructions.nav.turtole'),
  //      items: [
  //        { label: this.translate.instant('instructions.nav.turtole_parts'), command: () => this.updateVideo('MIBB8Nik8ZA') },
  //        { label: this.translate.instant('instructions.nav.turtole_connecting'), command: () => this.updateVideo('DVaZTOP5GB8') }
  //      ]
  //    }
  //  ];
  //}
}
