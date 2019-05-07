import { Component, OnInit } from '@angular/core';
import {Indicator} from '../../../models/indicator.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from '../../../services/http-client.service';
import {fadeIn} from '../../../shared/animations/router-animation';
import {ReferralType} from '../../../models/referral-type.model';

@Component({
  selector: 'app-reffereal-type',
  templateUrl: './reffereal-type.component.html',
  styleUrls: ['./reffereal-type.component.scss'],
  animations: [fadeIn]
})
export class RefferealTypeComponent implements OnInit {

  viewDetails: boolean = false;
  loading: boolean = false;
  saving_data: boolean = false;
  items: ReferralType[] = [];
  itemId: number;
  tableConfigurations = {
    tableColumns: [
      {name: 'referralTypeName', label: 'Name'},
      {name: 'active', label: 'Active' , type: 'boolean'},
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
    empty_msg: 'No Items'
  };
  submitForm: FormGroup;
  constructor(
    private httpClient: HttpClientService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getItems();
    this.submitForm = this.fb.group({
      referralTypeName: ['', Validators.required],
      isActive: [true]
    });
  }

  async getItems() {
    this.loading = true;
    const items = await this.httpClient.getOpenSRP('referral-types').toPromise();
    console.log('nafika', items);
    this.items = items.map(
      item => ({
        ...item,
        id: item.referralTypeId
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

  onUpdate(item: ReferralType) {
    this.itemId = item.referralTypeId;
    this.submitForm.patchValue({
      referralTypeName: item.referralTypeName,
      isActive: item.active
    });
    this.viewDetails = true;
  }

  async save(formValue) {
    this.saving_data = true;
    const payload: any = [{
      referralTypeName: formValue.referralTypeName,
      isActive: formValue.isActive
    }];
    if (this.itemId) {
      payload[0].referralTypeId = this.itemId;
    }
    try {
      const saved = await this.httpClient.postOpenSRP('create-referral-types', payload).toPromise();
      this.saving_data = false;
      this.httpClient.showSuccess('Referral Type Created Successful');
      this.getItems();

      this.closeForm();
      this.submitForm.reset();
    } catch (e) {
      console.log(e);
      this.saving_data = false;
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
