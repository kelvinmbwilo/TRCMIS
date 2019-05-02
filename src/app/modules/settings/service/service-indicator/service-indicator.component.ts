import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Indicator} from '../../../../models/indicator.model';
import {HttpClientService} from '../../../../services/http-client.service';

@Component({
  selector: 'app-service-indicator',
  templateUrl: './service-indicator.component.html',
  styleUrls: ['./service-indicator.component.scss']
})
export class ServiceIndicatorComponent implements OnInit {

  @Input() serviceItem: any;
  @Output() close = new EventEmitter();
  indicators: Indicator[] = [];
  loadingIndicators: boolean;
  currentIndicators = [];
  tableConfigurations = {
    tableColumns: [
      {name: 'indicatorName', label: 'English Name'},
      {name: 'indicatorNameSw', label: 'Swahili Name'},
    ],
    tableCaption: '',
    tableNotifications: '',
    showSearch: false,
    showBorder: true,
    allowPagination: false,
    hideExport: true,
    actionIcons: {edit: false, delete: true, more: false, print: false},
    doneLoading: false,
    deleting: {},
    active: {},
    empty_msg: 'No Indicators'
  };
  selectedIndicators: any[] = [];
  searchValue: string = '';
  excludeIds = '';
  private saving_data: boolean;
  constructor(
    private httpClient: HttpClientService
  ) { }

  ngOnInit() {
    this.getIndicators();
    if (this.serviceItem) {
      if (this.serviceItem.indicators) {
        this.currentIndicators = this.serviceItem.indicators.map(item => {
          return {
            ...item,
            id: item.referralServiceIndicatorId
          };
        });
        this.excludeIds = this.serviceItem.indicators.map(i => i.referralIndicatorId).join('');
      }
    }
  }

  async getIndicators() {
    this.loadingIndicators = true;
    const items = await this.httpClient.getOpenSRP('get-indicators').toPromise();
    this.indicators = items.map(
      item => ({
        ...item,
        id: item.indicatorId
      })
    );
    this.loadingIndicators = false;
  }

  async onDelete(item) {
    this.tableConfigurations.deleting = {};
    this.tableConfigurations.deleting[item.id] = true;
    try {
      const saved = await this.httpClient.getOpenSRP(`delete-referral-service-indicator/${item.id}`).toPromise();
      this.tableConfigurations.deleting[item.id] = true;
      this.httpClient.showSuccess('Indicator Mapping Deleted Successful');
      this.currentIndicators = this.currentIndicators.filter(ind => ind.id !== item.id);
    } catch (e) {
      console.log(e);
      this.httpClient.showError('Something went wrong, Try Again', 3000);
    }
  }


  async save() {
    this.saving_data = true;
    const payload = [
      {
        referralServiceId: this.serviceItem.serviceId,
        referralIndicatorId: this.selectedIndicators.map(i => parseInt(i + '', 10))
      }
    ];
    try {
      const saved = await this.httpClient.postOpenSRP('create-referral-services-indicators', payload).toPromise();
      this.saving_data = false;
      this.httpClient.showSuccess('Indicator Mapping Created Successful');
      this.closeForm(true);
    } catch (e) {
      console.log(e);
      this.httpClient.showError('Something went wrong, Try Again', 3000);
    }
  }

  closeForm(success =  false) {
    this.close.emit(success);
  }

}
