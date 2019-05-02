import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
declare var window;
@Injectable({providedIn: 'root'})
export class HttpClientService {
  public DHISAPIURL = '../../../dhis/api/';
  public OPENSRPAPIURL = '../../../opensrp/';
  public OPENMRSURL = '../../../openmrs/ws/rest/v1/';

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
  }

  prepareToken(credentials: { username, password }) {
    const username = credentials.username;
    const password = credentials.password;
    const token = btoa(username + ':' + password);
    localStorage.setItem('htmr-web-token', token);
    if (typeof(Storage) !== undefined) {
      window.sessionStorage.setItem('htmr-web-token', token);
      console.log('ipo feeded tayari...');
    } else {
      // TODO: execute block of codes if there is not local storage support
    }

    return token;
  }

  getToken() {
    return localStorage.getItem('htmr-web-token');
  }

  deleteToken() {
    localStorage.removeItem('htmr-web-token');
    localStorage.removeItem('htmr-starting-location');
    if (typeof(Storage) !== undefined) {
      window.sessionStorage.removeItem('AuthToken');
    } else {
      // TODO: execute block of codes if there is not local storage support
    }
  }

  createDHISAuthorizationHeader() {
    const username = 'admin';
    const password = 'district';

    const token = btoa(username + ':' + password);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + token });

    return headers;
  }

  createOpenMRSAuthorizationHeader(token) {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + token);

    return 'Basic ' + token;
  }


  createOPENSRPAuthorizationHeader() {

    const token = this.getToken();
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + token);

    return headers;
  }

  get(url) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.get<any>(this.DHISAPIURL + url, {headers});
  }

  getOpenMRS(url) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
    return this.http.get(this.OPENMRSURL + url, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', headers)
    });
  }

  getOpenMRSLocation(url) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
    return this.http.get('../../../openmrs/q/' + url, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', headers)
    });
  }


  getDHIS(url) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.get(this.DHISAPIURL + url, {
      headers
    });
  }

  postOpenMRS(url, data, options?) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
    return this.http.post(this.OPENMRSURL + url, data, {
      headers: new HttpHeaders()
        .set('Authorization', headers)
    });
  }


  postDHIS(url, data, options?) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.post(this.DHISAPIURL + url, data, {headers});
  }

  putDHIS(url, data, options?) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.put(this.DHISAPIURL + url, data, {headers});
  }

  login1(loginCredentials) {
    return this.getOpenSRP('security/authenticate');
  }

  postOpenSRP(url, data, options?) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
    return this.http.post(this.OPENSRPAPIURL + url, data, {
      headers: new HttpHeaders()
        .set('Authorization', headers)
    });
  }

  postOpenSRP1(url, data, options?) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
    const postOptions = {
      headers: new HttpHeaders().set('Authorization', headers),
      responseType: 'text'
    };
    return this.http.post(this.OPENSRPAPIURL + url, data, { headers: new HttpHeaders().set('Authorization', headers), responseType: 'text'});
  }


  getOpenSRP(url) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
    // const headers: HttpHeaders = this.createOPENSRPAuthorizationHeader();
    return this.http.get<any>(this.OPENSRPAPIURL + url, {
      headers: new HttpHeaders()
        .set('Authorization', headers)
    });
  }

  deleteOpenSRP(url, id) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
    return this.http.delete<any>(this.OPENSRPAPIURL + url + '/' + id, {
      headers: new HttpHeaders()
        .set('Authorization', headers)
    });
  }

  updateOpenSRP(url, data, id) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
    return this.http.put<any>(this.OPENSRPAPIURL + url + '/' + id, data, {
      headers: new HttpHeaders()
        .set('Authorization', headers)
    });
  }


  deleteDHIS(url, options?) {
    const headers: HttpHeaders = this.createDHISAuthorizationHeader();
    return this.http.delete(this.DHISAPIURL + url, {headers});
  }


  putOpenMRS(url, data, options?) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
    return this.http.post<any>(this.OPENMRSURL + url, data, {
      headers: new HttpHeaders()
        .set('Authorization', headers)
    });
  }

  deleteOpenMRS(url, options?) {
    const headers: string = this.createOpenMRSAuthorizationHeader(this.getToken());
    return this.http.delete(this.OPENMRSURL + url, {
      headers: new HttpHeaders()
        .set('Authorization', headers)
    });
  }


  showSuccess(message: string = 'Success') {
    this.snackBar.open(message, 'Ok', {
      duration: 2500,
      panelClass: 'success'
    });
  }

  showError(message: string = 'Operation Failed', duration: number = 2500) {
    this.snackBar.open(message, 'Ok', { duration, panelClass: 'error' });
  }

  showWarning(message: string = 'Something went wrong', duration: number = 2500) {
    this.snackBar.open(message, 'Ok', { duration, panelClass: 'warning' });
  }


}
