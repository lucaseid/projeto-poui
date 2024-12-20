import { Component, ViewChild, OnInit } from '@angular/core';
 

import { PoBreadcrumb, PoDynamicModule, PoDynamicViewField, PoModalComponent, PoModalModule } from '@po-ui/ng-components';
import {
  PoPageDynamicTableActions,
  PoPageDynamicTableCustomAction,
  PoPageDynamicTableCustomTableAction,
  PoPageDynamicTableModule
} from '@po-ui/ng-templates';
import { DatasulService } from '../../services/datasul.service';

@Component({
  selector: 'app-tabela-dinamica',
  templateUrl: './tabela-dinamica.component.html',
  styleUrl: './tabela-dinamica.component.css',
  standalone:true,
  imports:[
    PoPageDynamicTableModule,
    PoModalModule,
    PoDynamicModule
  ]
})
export class TabelaDinamicaComponent implements OnInit {

  datasul: any[] = [];

  constructor(private datasulService: DatasulService) {}

  ngOnInit(): void {
    this.datasulService.getAll().subscribe(data => {
      this.datasul = data.items;
    })
  }

  @ViewChild('logDetailModal') logDetailModal!: PoModalComponent;
 
  formatDate(date: Date): string {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

  actionsRight = true;
  logAudit: any;
  quickSearchWidth: number = 3;
  hideRemoveAllDisclaimer = false;
  hideCloseDisclaimers: Array<string> = ['address_city'];

  readonly actions: PoPageDynamicTableActions = {
    new: '/documentation/po-page-dynamic-edit',
    remove: true,
    removeAll: true
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Consulta de Registros' }]
  };
 
  
  readonly fields: Array<any> = [
    { property: 'id', key: true, visible: false },
    { property: 'tela', label: 'Nome da Tela', width: '115px', filter: true, gridColumns: 6 },
    {
      property: 'data-ini',
      label: 'Data Início',
      filter: true,
      gridColumns: 6,
      initValue: this.formatDate(new Date())  
    },  
    {
      property: 'data-fim',
      label: 'Data Fim',
      filter: true,
      gridColumns: 6,
      initValue: this.formatDate(new Date())  
    },  
  ];

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'tela', gridLgColumns: 4, divider: 'Info' },
    { property: 'data', gridLgColumns: 4 }    
  ];
 
  tableCustomActions: Array<PoPageDynamicTableCustomTableAction> = [
    {
      label: 'Details',
      action: this.onClickLogDetail.bind(this),
      icon: 'ph ph-user'
    }
  ]; 

  private onClickLogDetail(audit: any) {
    this.logAudit = audit;
    this.logDetailModal.open();
  }
 
}
