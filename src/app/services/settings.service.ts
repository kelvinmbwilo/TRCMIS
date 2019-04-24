import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SettingsService {

  constructor(private http: HttpClientService) {

  }

  listReferalIndicators() {
    return Observable.create(observer => {
      this.http.getOpenSRP('get-indicators')
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  listReferalServices(): Observable<any> {
    return Observable.create(observer => {
      this.http.getOpenSRP('get-referral-services')
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  addReferalIndicators(data) {
    return Observable.create(observer => {
      this.http.postOpenSRP('add-referral-indicators', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error(`Some error occurred: ${error.statusText}`);
          });
    });
  }

  addReferalServices(data) {
    return Observable.create(observer => {
      this.http.postOpenSRP('add-referral-services', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });

    });
  }

  editReferalIndicators(data, id) {
    return Observable.create(observer => {
      this.http.postOpenSRP('edit-referral-services', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  editReferalServices(data, id) {
    return Observable.create(observer => {
      this.http.postOpenSRP('', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  deleteReferalIndicators(data, id) {
    return Observable.create(observer => {
      this.http.deleteOpenSRP('', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  deleteReferalServices(data, id) {
    return Observable.create(observer => {
      this.http.deleteOpenSRP('', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  listServiceIndicatorMerge() {
    return Observable.create(observer => {
      this.http.getOpenSRP('boresha-afya-services')
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  createServiceIndicatorMerge(data) {
    return Observable.create(observer => {
      this.http.postOpenSRP('add-referral-service-indicators', data)
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  deleteServiceIndicatorMerge(id) {
    return Observable.create(observer => {
      this.http.deleteOpenSRP('', '')
        .subscribe((locationResponse: any) => {
            observer.next(locationResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

}
