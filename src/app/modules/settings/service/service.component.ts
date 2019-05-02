import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from '../../../services/http-client.service';
import {ReferralService} from '../../../models/refferal-service.model';
import {fadeIn} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  animations: [fadeIn]
})
export class ServiceComponent implements OnInit {

  viewDetails: boolean = false;
  loading: boolean = false;
  saving_data: boolean = false;
  items: ReferralService[] = [];
  itemId: number = null;
  tableConfigurations = {
    tableColumns: [
      {name: 'serviceName', label: 'English Name'},
      {name: 'serviceNameSw', label: 'Swahili Name'},
      {name: 'category', label: 'Category'},
      {name: 'indicatorEn', label: 'Indicators'},
      // {name: 'indicatorSw', label: 'Viashiria'},
    ],
    tableCaption: '',
    tableNotifications: '',
    showSearch: true,
    showBorder: true,
    allowPagination: true,
    actionIcons: {edit: true, delete: true, more: false, print: false, customPrimary: true},
    doneLoading: false,
    deleting: {},
    customPrimaryMessage: 'Indicators',
    active: {},
    empty_msg: 'No Referral Services'
  };
  submitForm: FormGroup;
  view_type: string = 'add';
  currentService: any;
  formTitle: string;
  constructor(
    private httpClient: HttpClientService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getItems();
    this.submitForm = this.fb.group({
      serviceName: ['', Validators.required],
      serviceNameSw: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  async getItems() {
    this.loading = true;
    const items = await this.httpClient.getOpenSRP('boresha-afya-services').toPromise();
    console.log('nafika', items);
    this.items = items.map(item => {
      return {
        ...item,
        indicatorEn: item.indicators.map((i: any) => i.indicatorName).join(', '),
        indicatorSw: item.indicators.map((i: any) => i.indicatorNameSw).join(', '),
      };
    });
    this.loading = false;
  }

  add() {
    this.viewDetails = true;
    this.view_type = 'add';
    this.itemId = null;
    this.formTitle = 'Create new Service';
  }

  setIndicators(item) {
    this.currentService = item;
    this.formTitle = `Set Services for ${item.serviceName}`;
    this.view_type = 'indicator';
    this.viewDetails = true;
  }

  viewMore(item) {
    console.log(item);
  }

  onUpdate(item: ReferralService) {
    this.itemId = item.id;
    this.submitForm.patchValue({
      serviceName: item.serviceName,
      serviceNameSw: item.serviceNameSw,
      category: item.categoryName
    });
    this.formTitle = `Update Services ${item.serviceName}`;
    this.view_type = 'add';
    this.viewDetails = true;
  }

  async save(formValue) {
    this.saving_data = true;
    const payload: any = [{
      serviceName: formValue.serviceName,
      serviceNameSw: formValue.serviceNameSw,
      category: formValue.category
    }];
    if (this.itemId) {
      payload[0].id = this.itemId;
    }
    try {
      const saved = await this.httpClient.postOpenSRP('create-referral-services', payload).toPromise();
      this.loading = false;
      this.httpClient.showSuccess('Referral Services Created Successful');
      this.getItems();
    } catch (e) {
      console.log(e);
      this.httpClient.showError('Something went wrong, Try Again', 3000);
    }
  }

  onDelete(item) {
    this.tableConfigurations.deleting = {};
    this.tableConfigurations.deleting[item.id] = true;
  }

  doneMapping(event) {
    if (event) {
      this.getItems();
      this.closeForm();
    }
  }

  closeForm() {
    this.viewDetails = false;
    this.view_type = '';
  }


}
