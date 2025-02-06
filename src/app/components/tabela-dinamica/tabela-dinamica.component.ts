import { Component, ViewChild, OnInit } from '@angular/core';
import { PoBreadcrumb, PoDynamicModule, PoDynamicViewField, PoModalComponent, PoModalModule } from '@po-ui/ng-components';
import { PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableCustomTableAction, PoPageDynamicTableModule, PoPageDynamicTableOptions } from '@po-ui/ng-templates';
import { HttpClient} from '@angular/common/http'; 
import { InterceptorsModule } from '../../interceptors/interceptors.module';
 

@Component({
  selector: 'app-tabela-dinamica',
  templateUrl: './tabela-dinamica.component.html',
  styleUrl: './tabela-dinamica.component.css',
  standalone: true,
  imports: [
    PoPageDynamicTableModule,
    PoModalModule,
    PoDynamicModule,
    InterceptorsModule 
     
    
  ], 
   
})

 
export class TabelaDinamicaComponent implements OnInit {
  
  dados: any[] = [];
  tabelaData: any[] = [];
  public carregandoTabela = false;   
  readonly serviceApi = 'http://192.168.1.240:8180/api/csp/v1/api-poui';
  

   ngOnInit(): void {
    this.getInterceptorAPI();
  }

  onLoadData(event: any) {
    console.log('Dados recebidos pela tabela:', event);
  }

constructor(private _http: HttpClient) { }
 
isHideLoading: boolean = true;

getInterceptorAPI() {
  this.isHideLoading = false;
  return this._http.get<ApiResponse>(this.serviceApi)
    .subscribe({
      next: (response: ApiResponse) => {
        this.isHideLoading = true;
        console.log('Resposta completa:', response);
        
        // Verifica se response.items contém 15 itens
        console.log('Itens:', response.items);
        
        this.dados = response.items;
        localStorage.setItem('data', JSON.stringify(response.items));
        
        this.tabelaData = response.items;
        console.log('Dados da tabela:', this.tabelaData);
      },
      error: (err) => {
        this.isHideLoading = true;
        console.error('Erro na requisição:', err);
      }
    });
}

onLoad(): PoPageDynamicTableOptions {
  return {
    fields: [
      { property: 'cod-etiqueta', label: 'Código', key: true, visible: true, filter: true },
      { property: 'dt-event', label: 'Data', filter: true, gridColumns: 6 },
      
    ]
  };
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

interface ApiResponse {
  total: number;
  hasNext: boolean;
  items: Array<{
    'cod-etiqueta': string;
    'dt-event': string;
  }>;
}