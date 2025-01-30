import { Component, ViewChild, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDynamicModule, PoDynamicViewField, PoModalComponent, PoModalModule } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { DatasulService } from '../../services/datasul.service';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
 
import { provideHttpClient, withInterceptors } from '@angular/common/http';

@Component({
  selector: 'app-tabela-dinamica',
  templateUrl: './tabela-dinamica.component.html',
  styleUrl: './tabela-dinamica.component.css',
  standalone: true,
  imports: [
    PoPageDynamicTableModule,
    PoModalModule,
    PoDynamicModule,
    HttpClientModule // Importar o HttpClientModule aqui
  ],
 
 
})
export class TabelaDinamicaComponent implements OnInit {
  datasul: any[] = [];
  public carregandoTabela = false;   

  constructor(private datasulService: DatasulService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.datasulService.getAll().subscribe(data => {
      console.log('Dados recebidos da API:', data);
      if (data && Array.isArray(data.items)) {
        this.datasul = data.items; // Acesse a propriedade 'items' se existir
        console.log(this.datasul); // Verifique se os dados estão corretos
        this.mapFields();
      } else {
        console.error('Dados não encontrados ou estrutura inválida:', data);
      }
    },
    error => {
      console.error('Erro ao buscar dados:', error);
    });
  }

  private mapFields(): void {
    if (this.datasul.length > 0) {
      console.log('Dados a serem mapeados:', this.datasul);
      this.fields.forEach(field => {
        field.value = this.datasul.map(item => {
          console.log('Campo:', field.property, 'Valor:', item[field.property]);
          return item[field.property] || '';
        });
      });
      console.log('Fields atualizados:', this.fields);
      this.cdr.detectChanges(); // Notifique o Angular sobre as mudanças
    } else {
      console.warn('Nenhum dado disponível para mapear os campos.');
    }
  }

  @ViewChild('logDetailModal') logDetailModal!: PoModalComponent;

  readonly fields: Array<any> = [
    {
      property: 'cod-etiqueta',
      label: 'Código da Etiqueta',
      width: '115px',
      filter: true,
      gridColumns: 6,
      value: [] // Inicialize como um array vazio
    },
    {
      property: 'dt-event',
      label: 'Data do Evento',
      filter: true,
      gridColumns: 6,
      value: [] // Inicialize como um array vazio
    }
  ];

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
    removeAll: true,
    
  };

  readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Consulta de Registros' }]
  };

  readonly detailFields: Array<PoDynamicViewField> = [
    { property: 'cod-etiqueta', gridLgColumns: 4, divider: 'Info' },
    { property: 'dt-event', gridLgColumns: 4 }
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
