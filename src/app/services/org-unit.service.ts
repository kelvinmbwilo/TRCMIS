import { Injectable } from '@angular/core';
import {HttpClientService} from './http-client.service';

@Injectable({providedIn: 'root'})
export class OrgUnitService {
  nodes: any[] = null;
  constructor(
    private http: HttpClientService
  ) { }

  getLevel4OrgunitsIds(orgunits: any[], uuid) {
    let orgunitItems = orgunits
      .filter((ou: any) => ou.parents.indexOf(uuid) !== -1)
      .map(ou => ou.id);
    if (orgunitItems.length === 0) {
      orgunitItems = [uuid];
    }
    return orgunitItems;
  }

  getLevel4OrgunitsNames(orgunits: any[], uuid) {
    return orgunits
      .filter((ou: any) => ou.parents.indexOf(uuid) !== -1)
      .map(ou => {
        return {
          facility_name: ou.name,
          facility_id: ou.id
        };
      });
  }


}

