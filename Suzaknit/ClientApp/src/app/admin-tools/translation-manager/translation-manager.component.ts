import { Component, OnInit } from '@angular/core';
import { AdminToolsService } from '../../services/admin-tools.service';
import { forkJoin } from 'rxjs';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-translation-manager',
  templateUrl: './translation-manager.component.html',
  styleUrls: ['./translation-manager.component.css']
})
export class TranslationManagerComponent implements OnInit {

  files: { en: JSON, he: JSON };
  addRowModalVisibility: boolean;
  addNewElementModal: boolean;
  cols: any[];
  selectedNode: TreeNode;
  tempSelectedNode: TreeNode;
  newTreeElement: TreeElement = new TreeElement();

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
      { field: 'en', header: 'En' },
      { field: 'buttons', header: '' }
    ];
  }

  nodeSelect(event) {
    this.tempSelectedNode = this.selectedNode;
  }

  nodeUnselect(event) {
    if (event.node.data.id === this.tempSelectedNode.data.id) {
      this.selectedNode = this.tempSelectedNode;
    }
  }

  showAddElementModal() {
    this.newTreeElement = new TreeElement();
    this.addNewElementModal = true;
    this.addRowModalVisibility = true;
  }

  showUpdateElementModal() {
    this.newTreeElement = new TreeElement({
      key: this.selectedNode.data.id,
      he: this.selectedNode.data.he,
      en: this.selectedNode.data.en,
      isParent: !!this.selectedNode.children && !!this.selectedNode.children.length
    });
    this.addNewElementModal = false;
    this.addRowModalVisibility = true;
  }

  addSiblingElement() {
    if (this.newTreeElement.hasErrors()) {
      return;
    }

    const idHierarchy: string[] = this.getHierarchyID(this.selectedNode);
    idHierarchy.pop();
    this.addElement(idHierarchy);
    this.addRowModalVisibility = false;
  }

  addChildElement() {
    if (this.newTreeElement.hasErrors()) {
      return;
    }

    const idHierarchy: string[] = this.getHierarchyID(this.selectedNode);
    this.addElement(idHierarchy);
    this.addRowModalVisibility = false;
  }

  updateElement() {
    if (this.newTreeElement.hasErrors()) {
      return;
    }

    const idHierarchy: string[] = this.getHierarchyID(this.selectedNode);
    let currentEnLocation = this.files.en;
    let currentHeLocation = this.files.he;
    if (idHierarchy && idHierarchy.length) {
      idHierarchy.forEach((value, index) => {
        if (index === idHierarchy.length - 1) {
          // Add new elements
          currentEnLocation[this.newTreeElement.key] = this.newTreeElement.isParent ? currentEnLocation[value] : this.newTreeElement.en
          currentHeLocation[this.newTreeElement.key] = this.newTreeElement.isParent ? currentHeLocation[value] : this.newTreeElement.he
          // Remove current elements
          if (value !== this.newTreeElement.key) {
            delete currentEnLocation[value];
            delete currentHeLocation[value];
          }
        } else {
          currentEnLocation = currentEnLocation[value];
          currentHeLocation = currentHeLocation[value];
        }
      });
    } else {
      currentEnLocation = this.addtoObject(currentEnLocation, true);
      currentHeLocation = this.addtoObject(currentHeLocation, false);
    }

    // refresh table
    this.files = { ... this.files };
    this.addRowModalVisibility = false;
  }

  removeElement() {
    const idHierarchy: string[] = this.getHierarchyID(this.selectedNode);
    let currentEnLocation = this.files.en;
    let currentHeLocation = this.files.he;
    idHierarchy.forEach((value, index) => {
      if (index === idHierarchy.length - 1) {
        delete currentEnLocation[value];
        delete currentHeLocation[value];
      } else {
        currentEnLocation = currentEnLocation[value];
        currentHeLocation = currentHeLocation[value];
      }
    });

    // refresh table
    this.files = { ... this.files };
    this.selectedNode = undefined;
  }

  private addElement(idHierarchy: string[]) {
    let currentEnLocation = this.files.en;
    let currentHeLocation = this.files.he;

    if (idHierarchy && idHierarchy.length) {
      idHierarchy.forEach((value, index) => {
        if (index === idHierarchy.length - 1) {
          currentEnLocation[value] = typeof currentEnLocation[value] === 'object' ?
            this.addtoObject(currentEnLocation[value], true) : this.addAsObject(currentEnLocation[value], true);
          currentHeLocation[value] = typeof currentHeLocation[value] === 'object' ?
            this.addtoObject(currentHeLocation[value], false) : this.addAsObject(currentHeLocation[value], false);
        } else {
          currentEnLocation = currentEnLocation[value];
          currentHeLocation = currentHeLocation[value];
        }
      });
    } else {
      currentEnLocation = this.addtoObject(currentEnLocation, true);
      currentHeLocation = this.addtoObject(currentHeLocation, false);
    }

    // refresh table
    this.files = { ... this.files };
    this.selectedNode = undefined;
  }

  private addtoObject(jsonObject: JSON, isEn: boolean): JSON {
    jsonObject[this.newTreeElement.key] = isEn ? this.newTreeElement.en : this.newTreeElement.he;
    return jsonObject;
  }

  private addAsObject(jsonObject: JSON, isEn: boolean): JSON {
    jsonObject = JSON.parse(`{ "${this.newTreeElement.key}":"${isEn ? this.newTreeElement.en : this.newTreeElement.he}" }`);
    return jsonObject;
  }

  private getHierarchyID(currentNode: TreeNode): string[] {
    let retValue: string[] = [];
    if (currentNode) {
      retValue = this.getHierarchyID(currentNode.parent);
      retValue.push(currentNode.data.id);
    }

    return retValue;
  }
}

export class TreeElement {
  private _key: string;
  private _he: string;
  private _en: string;

  invalidKey = false;
  invalidHe = false;
  invalidEn = false;
  isParent = false;

  public constructor(init?: Partial<TreeElement>) {
    Object.assign(this, init);
  }

  set key(value: string) {
    this._key = value;
    this.invalidKey = this._key === null || this._key === undefined || this._key === '';
  }

  get key(): string {
    return this._key;
  }

  set he(value: string) {
    this._he = value;
    this.invalidHe = this._he === null || this._he === undefined || this._he === '';
  }

  get he(): string {
    return this._he;
  }

  set en(value: string) {
    this._en = value;
    this.invalidEn = this._en === null || this._en === undefined || this._en === '';
  }

  get en(): string {
    return this._en;
  }


  hasErrors(): boolean {
    this.invalidKey = this._key === null || this._key === undefined || this._key === '';
    this.invalidHe = !this.isParent && (this._he === null || this._he === undefined || this._he === '');
    this.invalidEn = !this.isParent && (this._en === null || this._en === undefined || this._en === '');
    return this.invalidKey || this.invalidHe || this.invalidEn;
  }
}
