import { Component, OnInit } from '@angular/core';
import {Indicator} from '../../../models/indicator.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from '../../../services/http-client.service';
import {RegistrationReason} from '../../../models/registration-reason.model';

@Component({
  selector: 'app-registration-reason',
  templateUrl: './registration-reason.component.html',
  styleUrls: ['./registration-reason.component.scss']
})
export class RegistrationReasonComponent implements OnInit {

  viewDetails: boolean = false;
  loading: boolean = false;
  saving_data: boolean = false;
  items: Indicator[] = [];
  itemId: number;
  tableConfigurations = {
    tableColumns: [
      {name: 'descEn', label: 'English Name'},
      {name: 'descSw', label: 'Swahili Name'},
      {name: 'active', label: 'Active' , type: 'boolean'},
      {name: 'applicableToMen', label: 'Applicable To Men', type: 'boolean'},
      {name: 'applicableToWomen', label: 'Applicable To Women', type: 'boolean'},
      {name: 'updatedAt', label: 'Last Update', type: 'date'},
    ],
    tableCaption: '',
    tableNotifications: '',
    showSearch: true,
    showBorder: true,
    allowPagination: true,
    actionIcons: {edit: true, delete: true, more: false, print: false},
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
      descEn: ['', Validators.required],
      descSw: ['', Validators.required],
      isActive: [true],
      applicableToMen: [true],
      applicableToWomen: [true]
    });
  }

  async getItems() {
    this.loading = true;
    const items = await this.httpClient.getOpenSRP('registration-reasons').toPromise();
    console.log('nafika', items);
    this.items = items.map(
      item => ({
        ...item,
        id: item.registrationId
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

  onUpdate(item: RegistrationReason) {
    this.itemId = item.registrationId;
    this.submitForm.patchValue({
      descEn: item.descEn,
      descSw: item.descSw,
      isActive: item.isActive,
      applicableToMen: item.applicableToMen,
      applicableToWomen: item.applicableToWomen
    });
    this.viewDetails = true;
  }

  async save(formValue) {
    this.saving_data = true;
    const payload: any = [{
      descEn: formValue.descEn,
      descSw: formValue.descSw,
      isActive: formValue.isActive,
      applicableToMen: formValue.applicableToMen,
      applicableToWomen: formValue.applicableToWomen
    }];
    if (this.itemId) {
      payload[0].registrationId = this.itemId;
    }
    try {
      const saved = await this.httpClient.postOpenSRP('create-registration-reasons', payload).toPromise();
      this.loading = false;
      this.httpClient.showSuccess('Registration Reason Created Successful');
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

  closeForm() {
    this.viewDetails = false;
  }


}
