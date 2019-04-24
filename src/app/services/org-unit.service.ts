import { Injectable } from '@angular/core';
import {HttpClientService} from './http-client.service';

@Injectable({providedIn: 'root'})
export class OrgUnitService {

  nodes: any[] = null;
  constructor(
    private http: HttpClientService
  ) { }
}


