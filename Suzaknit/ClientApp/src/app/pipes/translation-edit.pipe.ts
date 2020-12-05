import { Pipe, PipeTransform } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Pipe({
  name: 'translationEdit'
})
export class TranslationEditPipe implements PipeTransform {

  transform(value: { en: JSON, he: JSON }, ...args: unknown[]): TreeNode[] {
    return value ? this.recursiveExtraction(value.en, value.he) : null;
  }

  private recursiveExtraction(en: JSON, he: JSON): TreeNode[] {
    let levelElements: TreeNode[] = [];
    let currentElement: TreeNode;
    for (let prop in en) {
      currentElement = typeof en[prop] === 'object' ? this.createChild(prop, en, he) : this.createLeaf(prop, en, he);
      levelElements.push(currentElement);
    }

    return levelElements;
  }

  private createChild(prop: string, en: JSON, he: JSON) {
    return {
      data: {
        'id': prop
      },
      children: this.recursiveExtraction(en[prop], he[prop]),
      expanded: true
    }
  }

  private createLeaf(prop: string, en: JSON, he: JSON) {
    return {
      data: {
        'id': prop,
        'en': en[prop],
        'he': he[prop]
      }
    };
  }
}
