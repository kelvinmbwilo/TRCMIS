import {Component, OnInit} from '@angular/core';
import {Indicator} from '../../../models/indicator.model';
import {HttpClientService} from '../../../services/http-client.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {fadeIn} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.scss'],
  animations: [fadeIn]
})
export class IndicatorsComponent implements OnInit {

  viewDetails: boolean = false;
  loading: boolean = false;
  saving_data: boolean = false;
  items: Indicator[] = [];
  itemId: number;
  tableConfigurations = {
    tableColumns: [
      {name: 'indicatorName', label: 'English Name'},
      {name: 'indicatorNameSw', label: 'Swahili Name'},
      {name: 'isActive', label: 'Active', type: 'boolean'},
      {name: 'updatedAt', label: 'Last Update', type: 'date'},
    ],
    tableCaption: '',
    tableNotifications: '',
    showSearch: true,
    showBorder: true,
    allowPagination: true,
    actionIcons: {edit: true, delete: false, more: false, print: false},
    doneLoading: false,
    deleting: {},
    active: {},
    empty_msg: 'No Indicators'
  };
  submitForm: FormGroup;

  constructor(
    private httpClient: HttpClientService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getItems();
    this.submitForm = this.fb.group({
      indicatorName: ['', Validators.required],
      indicatorNameSw: ['', Validators.required],
      isActive: [true]
    });
  }

  async getItems() {
    this.loading = true;
    const items = await this.httpClient.getOpenSRP('get-indicators').toPromise();
    this.items = items.map(
      item => ({
        ...item,
        id: item.indicatorId
      })
    );
    this.loading = false;
  }

  add() {
    this.viewDetails = true;
    this.itemId = null;
  }

  viewMore(item) {
    console.log(item);
  }

  onUpdate(item: Indicator) {
    this.itemId = item.indicatorId;
    this.submitForm.patchValue({
      indicatorName: item.indicatorName,
      indicatorNameSw: item.indicatorNameSw,
      isActive: item.isActive
    });
    this.viewDetails = true;
  }

  async save(formValue) {
    this.saving_data = true;
    const payload: any = [{
      indicatorName: formValue.indicatorName,
      indicatorNameSw: formValue.indicatorNameSw,
      isActive: formValue.isActive
    }];
    if (this.itemId) {
      payload[0].indicatorId = this.itemId;
    }
    try {
      const saved = await this.httpClient.postOpenSRP('create-referral-indicators', payload).toPromise();
      this.saving_data = false;
      this.httpClient.showSuccess('Indicator Created Successful');
      this.getItems();
      this.closeForm();
      this.submitForm.reset();
    } catch (e) {
      this.saving_data = false;
      console.log(e);
      this.httpClient.showError('Something went wrong, Try Again', 3000);
    }
  }

  onDelete(item) {
    this.tableConfigurations.deleting = {};
    this.tableConfigurations.deleting[item.id] = true;
  }

  closeForm() {
    this.viewDetails = false;
  }


}
