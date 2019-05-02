import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {HttpClientService} from '../../services/http-client.service';
import {LocationService} from '../../services/location.service';
import {OrgUnitService} from '../../services/org-unit.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  location_loading = false;
  locations: any[] = [];
  startDate: any;
  endDate: any;

  total_registration = 0;
  total_refferals = 0;
  total_ltfs = 0;
  total_chw = 0;

  card1Data = null;
  card2Data = null;
  card3Data = null;
  card4Data = null;

  card1DataLoading = false;
  card2DataLoading = false;
  card3DataLoading = false;
  card4DataLoading = false;


  @ViewChild('reportArea1') el1: ElementRef;
  @ViewChild('reportArea2') el2: ElementRef;
  @ViewChild('reportArea3') el3: ElementRef;
  @ViewChild('reportArea4') el4: ElementRef;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClientService,
    private locationService: LocationService,
    private orgunitService: OrgUnitService
    ) {}

  ngOnInit() {
    this.startDate = new Date(new Date().setDate(new Date().getDate() - 90));
    this.endDate = new Date(new Date().setDate(new Date().getDate() + 2));
    const start_date = new Date(this.startDate).toISOString().substr(0, 10).replace('-', '/').replace('-', '/');
    const end_date = new Date(this.endDate).toISOString().substr(0, 10).replace('-', '/').replace('-', '/');
    const starting_location = localStorage.getItem('htmr-starting-location');

    this.getLoacation(starting_location).then(locations => {
      const facilities = this.orgunitService.getLevel4OrgunitsIds(locations, starting_location);
      this.getTotalRegistration(start_date, end_date, facilities);
      this.getTotalRefferals(start_date, end_date, facilities);
      this.getTotalLTFs(start_date, end_date, facilities);
      this.getCHW(starting_location);
      this.updateCard1({from_date: start_date, to_date: end_date, facilities});
      this.updateCard2({from_date: start_date, to_date: end_date, facilities});
      this.updateCard3({from_date: start_date, to_date: end_date, facilities});
      this.updateCard4({from_date: start_date, to_date: end_date, facilities});
    });
  }

  async getTotalRefferals(from_date, to_date, facilities) {
    const data = await this.http.postOpenSRP(
      'reports/summary_total_referrals/json',
      {from_date, to_date, facilities}
    ).toPromise();
    if (data) {
      this.total_refferals = data['Total Referrals'];
    }
  }

  async getTotalLTFs(from_date, to_date, facilities) {
    const data = await this.http.postOpenSRP(
      'reports/summary_total_LTFS/json',
      {from_date, to_date, facilities}
    ).toPromise();
    if (data) {
      this.total_ltfs = data['Total LTFs'];
    }
  }

  async getTotalRegistration(from_date, to_date, facilities) {
    const data = await this.http.postOpenSRP(
      'reports/summary_total_registrations/json',
      {from_date, to_date, facilities}
      ).toPromise();
    if (data) {
      this.total_registration = data['Total Registrations'];
    }
  }
  async getCHW(ouID) {
    const data = await this.http.getOpenSRP(`get-team-members-by-facility-hierarchy/${ouID}`).toPromise();
    if (data) {
      this.total_chw = data;
    }
  }

  updateCard1(filter: {from_date, to_date, facilities}) {
    this.card1DataLoading = true;
    const reportUrl = 'reports/dashboard_total_referrals_issued/html';
    this.http.postOpenSRP1(reportUrl,
      filter)
      .subscribe((data: any) => {
        this.card1Data = data;
        this.card1DataLoading = false;
      }, error1 => this.card1DataLoading = false);
  }

  updateCard2(filter: {from_date, to_date, facilities}) {
    this.card2DataLoading = true;
    const reportUrl = 'reports/dashboard_total_registrations/html';
    this.http.postOpenSRP1(reportUrl,
      filter)
      .subscribe((data: any) => {
        this.card2Data = data;
        this.card2DataLoading = false;
      }, error1 => this.card2DataLoading = false);
  }

  updateCard3(filter: {from_date, to_date, facilities}) {
    this.card3DataLoading = true;
    const reportUrl = 'reports/dashboard_ltf_feedbacks/html';
    this.http.postOpenSRP1(reportUrl,
      filter)
      .subscribe((data: any) => {
        this.card3Data = data;
        this.card3DataLoading = false;
      }, error1 => this.card3DataLoading = false);
  }

  updateCard4(filter: {from_date, to_date, facilities}) {
    this.card4DataLoading = true;
    const reportUrl = 'reports/dashboard_total_failed_referrals/html';
    this.http.postOpenSRP1(reportUrl,
      filter)
      .subscribe((data: any) => {
        this.card4Data = data;
        this.card4DataLoading = false;
      }, error1 => this.card4DataLoading = false);
  }

  // this method was coppied form the orguni component and is to be moved to service letter
  async getLoacation(starting_location) {
    this.location_loading = true;
    const top_locations = await this.locationService.loadTreeLocations().toPromise();
    let visit_location: any = _.find(top_locations, {uuid: starting_location ? starting_location : 'ed787525-d770-11e8-ba9c-f23c917bb7ec'});
    const visit_locations = [];
    visit_locations.push(
      {
        name: visit_location.name,
        id: visit_location.uuid,
        level: 1,
        parents: ``
      });
    visit_location = {
      name: visit_location.name,
      id: visit_location.uuid,
      level: 1,
      children: visit_location.childLocations.map(
        (location: any) => {
          const child_loc = this.getChildOrgunits(top_locations, location.uuid);
          visit_locations.push(
            {
              name: child_loc.name,
              id: child_loc.uuid,
              level: 2,
              parents: `${visit_location.uuid}`
            });
          return {
            name: child_loc.name,
            id: child_loc.uuid,
            level: 2,
            children: child_loc.childLocations.map(
              (child: any) => {
                const last_child = this.getChildOrgunits(top_locations, child.uuid);
                visit_locations.push(
                  {
                    name: last_child.name,
                    id: last_child.uuid,
                    level: 3,
                    parents: `${visit_location.uuid};${child_loc.uuid}`
                  });
                return {
                  name: last_child.name,
                  id: last_child.uuid,
                  level: 3,
                  children: last_child.childLocations.map(
                    (level3child: any) => {
                      const facility = this.getChildOrgunits(top_locations, level3child.uuid);
                      visit_locations.push(
                        {
                          name: facility.name,
                          id: facility.uuid,
                          level: 4,
                          parents: `${visit_location.uuid};${child_loc.uuid};${last_child.uuid}`
                        });
                      return {
                        name: facility.name,
                        id: facility.uuid,
                        level: 4,
                        children: facility.childLocations
                      };
                    }
                  )
                };
              }
            )
          };
        }
      )
    };
    this.location_loading = false;
    return visit_locations;
  }

  getChildOrgunits(orgunits, uuid): any {
    return _.find(orgunits, {uuid});
  }
}
