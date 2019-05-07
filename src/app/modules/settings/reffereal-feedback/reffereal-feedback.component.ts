import { Component, OnInit } from '@angular/core';
import {ReferralType} from '../../../models/referral-type.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from '../../../services/http-client.service';
import {fadeIn} from '../../../shared/animations/router-animation';
import {ReferralFeedback} from '../../../models/referral-feedback.model';

@Component({
  selector: 'app-reffereal-feedback',
  templateUrl: './reffereal-feedback.component.html',
  styleUrls: ['./reffereal-feedback.component.scss'],
  animations: [fadeIn]
})
export class RefferealFeedbackComponent implements OnInit {

  viewDetails: boolean = false;
  loading: boolean = false;
  saving_data: boolean = false;
  items: ReferralFeedback[] = [];
  itemId: number;
  tableConfigurations = {
    tableColumns: [
      {name: 'desc', label: 'Name'},
      {name: 'descSw', label: 'Swahili Name'},
      {name: 'referralTypeName', label: 'Referral Type'},
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
  referral_types: ReferralType[] = [];
  constructor(
    private httpClient: HttpClientService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getItems();
    this.submitForm = this.fb.group({
      desc: ['', Validators.required],
      descSw: ['', Validators.required],
      referralType: ['', Validators.required],
    });
  }

  async getItems() {
    this.loading = true;
    this.referral_types = await this.httpClient.getOpenSRP('referral-types').toPromise();
    const items = await this.httpClient.getOpenSRP('referral-feedback').toPromise();
    console.log('nafika', items);
    this.items = items.map(
      item => {
        const referral_type = this.referral_types.filter(it => it.referralTypeId === item.referralType.referralTypeId)[0];
        return {
          ...item,
          referralTypeName: referral_type ? referral_type.referralTypeName : ''
        };
      }
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

  onUpdate(item: ReferralFeedback) {
    this.itemId = item.id;
    this.submitForm.patchValue({
      desc: item.desc,
      descSw: item.descSw,
      referralType: item.referralType.referralTypeId
    });
    this.viewDetails = true;
  }

  async save(formValue) {
    this.saving_data = true;
    let payload: any = [{
      desc: formValue.desc,
      descSw: formValue.descSw,
      referralType: {
        referralTypeId: formValue.referralType
      }
    }];
    let url = 'create-referral-feedback';
    if (this.itemId) {
      payload[0].id = this.itemId;
      url = 'update-referral-feedback';
      payload = {
        id: this.itemId,
        desc: formValue.desc,
        descSw: formValue.descSw,
        referralType: {
          referralTypeId: formValue.referralType
        }
      };
    }
    try {
      const saved = await this.httpClient.postOpenSRP(url, payload).toPromise();
      this.saving_data = false;
      this.httpClient.showSuccess('Referral Feedback Created Successful');
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
