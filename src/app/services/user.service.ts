import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import * as _ from 'lodash';
@Injectable({providedIn: 'root'})
export class UserService {
  loadingMessage: string = 'Loading Users';
  loggedIn = false;

  private navigations = [
    {
      name: 'Dashboard',
      links: ['', 'dashboard'],
      icon: 'fa fa-dashboard',
      roles: ['all'],
      accessibility: false
    },
    // {
    //   name: 'Data Entry',
    //   links: ['/home', 'data_entry'],
    //   icon: 'fa fa-edit',
    //   roles: ['System Developer'],
    //   accessibility: false
    // },
    // {
    //   name: 'Basic Reports',
    //   links: ['/home', 'basic_reports'],
    //   icon: 'fa fa-bar-chart',
    //   roles: ['System Developer'],
    //   accessibility: false
    // },
    // {
    //   name: 'Custom Reports',
    //   links: ['/home', 'reports'],
    //   icon: 'fa fa-bar-chart',
    //   roles: ['System Developer'],
    //   accessibility: false
    // },
    {
      name: 'Providers Reports',
      links: ['', 'providers_report', 'provide-report'],
      icon: 'fa fa-pie-chart',
      roles: ['System Developer'],
      accessibility: false
    },
    {
      name: 'Other Reports',
      links: ['', 'reports'],
      icon: 'fa fa-bar-chart',
      roles: ['System Developer'],
      accessibility: false
    },
    {
      name: 'Settings',
      links: ['', 'settings', 'services'],
      icon: 'fa fa-cogs',
      roles: ['System Developer'],
      accessibility: false
    },
    {
      name: 'Team Management',
      links: ['', 'users'],
      icon: 'fa fa-user',
      roles: ['System Developer'],
      accessibility: false
    },
    // {
    //   name: 'Form Management',
    //   links: ['/home', 'forms'],
    //   icon: 'fa fa-file-text',
    //   roles: ['System Developer'],
    //   accessibility: false
    // },
    {
      name: 'Location Management',
      links: ['', 'location'],
      icon: 'fa fa-map-signs',
      roles: ['System Developer'],
      accessibility: false
    }
  ];

  constructor(private http: HttpClientService) {
    if (this.http.getToken()) {
      this.loggedIn = true;
    }
  }

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.loggedIn);
          }, 800
        );
      }
    );
    return promise;
  }

  getNavigation() {
    if (this._getLocalStorageNavigation()) {
      return this._getLocalStorageNavigation();
    } else {
      return _.compact(this.navigations.map((nav) => {
        return nav.accessibility ? nav : undefined;
      }));
    }

  }

  setNavigation(user) {
    const loggedInUser = user.results[0];
    const roles = loggedInUser.allRoles;
    const navigations = _.cloneDeep(this.navigations);
    this.navigations = navigations.map(navigation => {
      let exist = false;
      if (navigation.roles.indexOf('all') > -1) {
        navigation.accessibility = true;
        return navigation;
      } else {
        roles.forEach(roleItem => {
          if (navigation.roles.indexOf(roleItem.name) > -1) {
            exist = true;
          }
        });
      }
      if (exist) {
        navigation.accessibility = true;
      }


      return navigation;

    });
    this._setLocalStorageNavigation(this.navigations);
  }

  private _setLocalStorageNavigation(navigations) {
    localStorage.setItem('_report_navigation', JSON.stringify(navigations));
  }

  private _getLocalStorageNavigation() {
    return eval(localStorage.getItem('_report_navigation'));
  }

  removeLocalStorageNavigation() {
    localStorage.removeItem('_report_navigation');
  }

  deleteToken() {
    this.http.deleteToken();
  }

  login(loginCredentials) {
    this.http.prepareToken(loginCredentials);
    return this.http.getOpenMRS('user?v=full&username=' + loginCredentials.username);
  }

  login1(loginCredentials) {
    this.http.prepareToken(loginCredentials);
    return this.http.getOpenSRP('security/authenticate');
  }

  sessionCheck() {

  }

  listPersons() {
    return Observable.create(observer => {

      this.http.getOpenMRS(`person?v=full`)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

  listRoles() {
    return Observable.create(observer => {

      this.http.getOpenMRS(`role?v=default`)
        .subscribe((personResponse: any) => {
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            observer.error('some error occur');
          });
    });
  }

  createPerson(person) {
    return Observable.create(observer => {

      this.http.postOpenMRS(`person`, person)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'person created successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'person creation  failed';
            observer.error('some error occur');
          });
    });
  }

  updatePerson(person, uuid) {
    return Observable.create(observer => {
      this.http.putOpenMRS(`person/` + uuid, person)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

  deletePerson(person): Observable<any> {
    return Observable.create(observer => {

      this.http.deleteOpenMRS(`person/` + person.uuid)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }


  listUsers(): Observable<User[]> {
    return Observable.create(observer => {

      this.http.getOpenMRS(`user?v=full`)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

  createUser(user) {
    return Observable.create(observer => {

      this.http.postOpenMRS(`user`, user)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

  updateUser(user, uuid) {
    return Observable.create(observer => {
      this.http.putOpenMRS(`user/` + uuid, user)
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

  deleteUser(user) {
    return Observable.create(observer => {

      this.http.deleteOpenMRS(`user/` + user.uuid + '?purge=true')
        .subscribe((personResponse: any) => {
            this.loadingMessage = 'loaded successfully';
            observer.next(personResponse);
            observer.complete();
          },
          error => {
            this.loadingMessage = 'loading failed';
            observer.error('some error occur');
          });
    });
  }

}
