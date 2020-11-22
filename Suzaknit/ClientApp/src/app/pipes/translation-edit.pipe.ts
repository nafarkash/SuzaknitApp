import { Pipe, PipeTransform } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Pipe({
  name: 'translationEdit'
})
export class TranslationEditPipe implements PipeTransform {

  transform(value: { en: JSON, he: JSON }, ...args: unknown[]): TreeNode[] {
    return this.recursiveExtraction(value.en, value.he);
  }

  private recursiveExtraction(en: JSON, he: JSON): TreeNode[] {
    let levelElements: TreeNode[] = [];
    let currentElement: TreeNode;
    for (let prop in en) {
      if (typeof en[prop] === 'object') {
        currentElement = {
          data: {
            'id': prop
          },
          children: this.recursiveExtraction(en[prop], he[prop])
        }
      } else {
        currentElement = {
          data: {
            'id': prop,
            'en': en[prop],
            'he': he[prop]
          }
        };
      }
      levelElements.push(currentElement);
    }

    return levelElements;
  }

}
