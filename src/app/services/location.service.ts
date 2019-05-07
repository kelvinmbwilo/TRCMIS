import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Location} from '../models/location';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LocationService {

  locations: Location[] = [];
  loadingMessage = 'Loading locations';

  constructor(private http: HttpClientService) {
  }

  // get all data element group
  loadLocations(): Observable<Array<Location>> {

    return Observable.create(observer => {

      this.http.getOpenMRS(`location?v=full&limit=8000`)
        .subscribe((locationResponse: any) => {

            this.locations = locationResponse.results.map((location) => {
              return {
                uuid: location.uuid,
                name: location.name,
                display: location.display,
                links: location.links,
                tags: location.tags,
                parentLocation: location.parentLocation,
                childLocations: location.childLocations,
                confirmDelete: false
              };
            });
            this.loadingMessage = 'loaded successfully';
            observer.next(this.locations);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });

    });

  }

// get all data element group
  loadTreeLocations(freshCopy: boolean = false): Observable<Array<Location>> {

    return Observable.create(observer => {
      if (this.locations.length > 0 && !freshCopy) {
        observer.next(this.locations);
        observer.complete();
      } else {
        this.http.getOpenMRS(`location?v=default&limit=8000`)
          .subscribe((locationResponse: any) => {

              this.locations = locationResponse.results
                .map((location) => {
                  return {
                    uuid: location.uuid,
                    id: location.id,
                    name: location.name,
                    display: location.display,
                    links: location.links,
                    tags: location.tags,
                    parentLocation: location.parentLocation,
                    childLocations: location.childLocations,
                    confirmDelete: false
                  };
                });
              this.loadingMessage = 'loaded successfully';
              observer.next(this.locations);
              observer.complete();
            },
            error => {
              this.loadingMessage = 'loading failed';
              observer.error('some error occur');
            });
      }
    });

  }

  sendHRFDetails(data): Observable<any> {
    return Observable.create(observer => {

      this.http.postOpenSRP('save-health-facilities', data)
        .subscribe((locationResponse: any) => {
            console.log({locationResponse});
            observer.next(this.locations);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });

    });
  }

  createLocation(dataObject): Observable<any> {
    this.loadingMessage = 'Creating new  location';
    return Observable.create(observer => {

      this.http.postOpenMRS(`location`, dataObject)
        .subscribe((locationResponse: any) => {
            this.loadingMessage = 'Created successfully';
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'Creation failed';
            observer.error('some error occur');
          });

    });

  }

  updateLocation(dataObject, uuid): Observable<any> {
    return Observable.create(observer => {

      this.http.postOpenMRS(`location/${uuid}`, dataObject)
        .subscribe((locationResponse: any) => {
            this.loadingMessage = 'Created successfully';
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'Creation failed';
            observer.error('some error occur');
          });

    });

  }

  deleteLocation(location): Observable<any> {
    this.loadingMessage = 'Deleting ' + location.name + ' location';
    return Observable.create(observer => {

      this.http.deleteOpenMRS(`location/` + location.uuid)
        .subscribe((locationResponse: any) => {
            this.loadingMessage = ' Deleted successfully';
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'Deletion failed';
            observer.error('some error occur');
          });

    });
  }

}
