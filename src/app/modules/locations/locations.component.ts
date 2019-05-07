import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../services/location.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from '../../services/http-client.service';
import {Location} from '../../models/location';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  viewDetails: boolean = false;
  loading: boolean = false;
  saving_data: boolean = false;
  items: any[] = [];
  itemId: number;
  tableConfigurations = {
    tableColumns: [
      {name: 'name', label: 'Name'},
      {name: 'tags', label: 'Tags'},
      {name: 'parent', label: 'Parent Location'}
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
    empty_msg: 'No Locations'
  };
  locationForm: FormGroup;
  view_type = '';
  currentLocation: Location;

  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private http: HttpClientService
  ) { }

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    this.loading = true;

    this.locationService.loadTreeLocations(true).subscribe((locations: any[]) => {
      this.items = locations.map((location: any) => ({
        ...location,
        id: location.uuid,
        tags: location.tags.map(item => item.display).join(', '),
        parent: location.parentLocation ? location.parentLocation.display : ''
      }));
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.http.showError('Something went wrong while loading locations');
    });
  }

  loadLocations1() {
    this.closeForm();
    this.loadLocations();
  }

  viewMore(event) {}
  onUpdate(event) {
    this.currentLocation = event;
    this.view_type = 'addData';
    this.viewDetails = true;
  }


  onDelete(item) {
    this.tableConfigurations.deleting = {};
    this.tableConfigurations.deleting[item.id] = true;
    this.locationService.deleteLocation(item).subscribe((success) => {
      this.loadLocations();
      this.tableConfigurations.deleting = {};
      this.http.showSuccess('Location Deleted Successful');
    }, (error) => {
      this.tableConfigurations.deleting = {};
      this.http.showError('Failed to delete location Please try again!');
    });
  }

  closeForm() {
    this.viewDetails = false;
    this.view_type = '';
  }

  add() {
    this.viewDetails = true;
    this.currentLocation = null;
    this.itemId = null;
    this.view_type = 'addData';
  }


}
