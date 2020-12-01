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

  cols: any[];
  selectedNode: TreeNode;
  tempSelectedNode: TreeNode;

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
      {field: 'buttons', header: ''}
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

  addNewElement() {
    
  }

  checkValues(rowData, rowNode) {
    console.log('data',rowData)
    console.log('node',rowNode)
    return true
  }

}
