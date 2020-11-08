import { Pipe, PipeTransform } from '@angular/core';
import { InstructionsMetadata } from '../models/instructions-metadata';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'instructionMenuItem'
})
export class InstructionMenuItemPipe implements PipeTransform {

  constructor(private translate: TranslateService) { }

  transform(value: InstructionsMetadata[]): MenuItem[] {
    if (!value) {
      return null;
    }

    let items: MenuItem[] = []
    value.forEach(instruction => {
      if (instruction.level === 0) {
        items.push(this.buildInstructionRecuresively(instruction));
      }
    });

    return items;
  }

  private buildInstructionRecuresively(instruction: InstructionsMetadata): MenuItem {
    const childItems: MenuItem[] = [];
    if (instruction.items) {
      instruction.items.forEach(childInstruction => childItems.push(this.buildInstructionRecuresively(childInstruction)));
    }

    return {
      label: this.translate.instant(instruction.translationKey),
      routerLink: instruction.url,
      //routerLink: [{ outlets: { videoUrl: [instruction.url] } }],
      items: childItems.length ? childItems : undefined
    }
  }
}
