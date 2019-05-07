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
  items: RegistrationReason[] = [];
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
    let payload: any = [{
      descEn: formValue.descEn,
      descSw: formValue.descSw,
      isActive: formValue.isActive,
      applicableToMen: formValue.applicableToMen,
      applicableToWomen: formValue.applicableToWomen
    }];
    let url = 'create-registration-reasons';
    if (this.itemId) {
      url = 'update-registration-reason';
      payload = {
        registrationId: this.itemId,
        descEn: formValue.descEn,
        descSw: formValue.descSw,
        isActive: formValue.isActive,
        applicableToMen: formValue.applicableToMen,
        applicableToWomen: formValue.applicableToWomen
      };
    }
    try {
      const saved = await this.httpClient.postOpenSRP(url, payload).toPromise();
      this.loading = false;
      this.httpClient.showSuccess('Registration Reason Created Successful');
      this.getItems();
      this.closeForm();
      this.submitForm.reset();
    } catch (e) {
      console.log(e);
      this.saving_data = false;
      this.httpClient.showError('Something went wrong, Try Again', 3000);
    }
  }

  async onDelete(item) {
    this.tableConfigurations.deleting = {};
    this.tableConfigurations.deleting[item.id] = true;
    try {
      const saved = await this.httpClient.getOpenSRP(`delete-registration-reasons/${item.id}`).toPromise();
      this.tableConfigurations.deleting[item.id] = true;
      this.httpClient.showSuccess('Registration Reason Deleted Successful');
      this.items = this.items.filter(ind => ind.id !== item.id);
    } catch (e) {
      console.log(e);
      this.httpClient.showError('Something went wrong, Try Again', 3000);
    }
  }

  closeForm() {
    this.viewDetails = false;
  }


}
