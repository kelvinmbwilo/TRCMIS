import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '../../../models/location';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from '../../../services/http-client.service';
import {LocationService} from '../../../services/location.service';
import {fadeIn} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css'],
  animations: [fadeIn]
})
export class AddLocationComponent implements OnInit {
  locationForm: FormGroup;
  @Input() locations: Location[] = [];
  @Output() saved = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input() currentLocation: Location;
  loading: boolean = false;
  tags = {
    tagOne: '15d11935-e183-43da-9c42-d0ced1efd872',
    tagTwo: '8d4626ca-7abd-42ad-be48-56767bbcf272'
  };
  editing: boolean = false;
  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private http: HttpClientService
  ) {
  }

  ngOnInit() {
    this.locationForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description: '',
        parentLocation: '',
        hfrCode: '',
        tagOne: '',
        tagTwo: '',
        search: ''
      });
    if (this.currentLocation) {
      this.editing = true;
      this.locationForm.patchValue({
        name: this.currentLocation.name,
        description: this.currentLocation.description,
        tagOne: this.getAppropriateTag('tagOne', this.currentLocation.tags),
        tagTwo: this.getAppropriateTag('tagTwo', this.currentLocation.tags),
        parentLocation: this.currentLocation.parentLocation.uuid
      });
    }
  }

  getAppropriateTag(formTagName, tagsArray) {
    console.log(tagsArray);
    return formTagName === 'tagOne' ? true : false;
  }

  get name() {
    return this.locationForm.get('name');
  }

  get search() {
    return this.locationForm.get('search');
  }

  onSubmit() {
    this.loading = true;
    const locationForm = this.locationForm;
    const dataObject = {
      name: '',
      display: '',
      parentLocation: '',
      description: '',
      tags: []
    };

    if (locationForm.valid && locationForm.touched) {
      const formData = locationForm.value;
      this.loading = true;
      dataObject.name = formData.name;
      dataObject.display = formData.name;
      dataObject.parentLocation = formData.parentLocation;
      dataObject.description = formData.description;

      !formData.tagOne ? dataObject.tags.push({uuid: this.tags.tagTwo, name: 'Transfer Location'}) :
        !formData.tagTwo ? dataObject.tags.push({uuid: this.tags.tagOne, name: 'CHW Location'}) :
          dataObject.tags = [{uuid: this.tags.tagOne, name: 'CHW Location'}, {uuid: this.tags.tagTwo, name: 'Transfer Location'}];
      let dataRes = null;
      if (this.currentLocation) {
        dataRes = this.locationService.updateLocation(dataObject, this.currentLocation.uuid);
      } else {
        dataRes = this.locationService.createLocation(dataObject);
      }
      dataRes.subscribe((success) => {
        this.locationForm.reset();
        this.loading = false;
        this.saved.emit();
        this.http.showSuccess('Location Created successful');
        if (!this.currentLocation) {
          this.locationService.sendHRFDetails(
            [
              {
                facilityName: formData.name,
                openmrsUIID: success.uuid ? success.uuid : '',
                parentOpenmrsUIID: formData.parentLocation,
                hfrCode: formData.hfrCode
              }
            ]
          ).subscribe((openSRPSuccess) => {
            console.log(openSRPSuccess);
          });
        }

      }, (error) => {
        this.loading = false;
        this.http.showError('Something went wrong while saving location');
      });
    }

  }

  closeForm() {
    this.close.emit();
  }


}
