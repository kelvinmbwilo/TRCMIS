import {Component, Input, OnInit} from '@angular/core';
import {HttpClientService} from '../../../services/http-client.service';
import {OrgUnitService} from '../../../services/org-unit.service';

@Component({
  selector: 'app-facility-refferal-report',
  templateUrl: './facility-refferal-report.component.html',
  styleUrls: ['./facility-refferal-report.component.scss']
})
export class FacilityRefferalReportComponent implements OnInit {

  loading: boolean = false;
  loading_failed: boolean = false;
  @Input() orgunit_tree_config: any = {
    show_search : true,
    search_text : 'Search',
    level: null,
    loading: true,
    loading_message: 'Loading Organisation units...',
    multiple: true,
    multiple_key: 'control', // can be control or shift
    placeholder: 'Select Location'
  };
  orgunit: any = null;
  start_date: any = '';
  end_date: any = '';
  providers: any = [];
  selected_providers: any[] = [];
  values: any[] = [];
  orgunitnames: string = '';
  done_loading: boolean = false;
  data_loading: boolean = false;
  selected_providers_names: string = '';
  constructor(
    private httpClient: HttpClientService,
    private orgUnitService: OrgUnitService
  ) { }

  ngOnInit() {
  }

  changeOrgUnit(orgunit) {
    this.orgunit = orgunit;
    this.orgunitnames = orgunit.items.map(d => d.name).join(', ');
  }

  checkDate() {  }

  getProviders() {
    const from_date = new Date(this.start_date).toISOString().substr(0, 10);
    const to_date = new Date(this.end_date).toISOString().substr(0, 10);

    this.data_loading = true;
    this.loading_failed = false;
    this.done_loading = false;
    const facilities = this.orgUnitService.getLevel4OrgunitsIds(this.orgunit.visit_locations, this.orgunit.value);
    const payload = {from_date, to_date, facilities};
    this.httpClient.postOpenSRP('/report/get-inter-facility-referrals-summary', payload)
      .subscribe(( data: any[]) => {
        if ( data && data.length !== 0) {
          // {'to_date':'2020-01-01','from_date':'2017-01-01','facilities':[{'facility_name':'test','facility_id':'tNo7WxkmuoN'}]}
          this.values = data;
        }
        this.done_loading = true;
        this.data_loading = false;
        this.loading_failed = false;
      }, (error) => {
        this.loading_failed = true;
        this.data_loading = false;
      });
  }

  setSelectedData(data) {
    this.selected_providers = data;
    this.selected_providers_names = this.selected_providers.map(d => d.name ).join(', ');
  }

  getData() {
    this.data_loading = true;
    const chw_uuid = this.selected_providers.map(provider => provider.id);
    const start_date = new Date(this.start_date).toISOString().substr(0, 10);
    const end_date = new Date(this.end_date).toISOString().substr(0, 10);
    this.httpClient.postOpenSRP('report/get-chw-referrals-summary',
      {from_date: start_date, to_date: end_date, chw_uuid})
      .subscribe((data: any) => {
        this.done_loading = true;
        this.data_loading = false;
        this.values = data;
      });
  }

}
