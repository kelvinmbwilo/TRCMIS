import {Component, Input, OnInit} from '@angular/core';
import {HttpClientService} from '../../../services/http-client.service';
import {OrgUnitService} from '../../../services/org-unit.service';
import {fadeIn} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-providers-refferal-report',
  templateUrl: './providers-refferal-report.component.html',
  styleUrls: ['./providers-refferal-report.component.scss'],
  animations: [fadeIn]
})
export class ProvidersRefferalReportComponent implements OnInit {
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
  detailed_values: any[] = [];
  detailed_loading: boolean = false;
  show_detailed: boolean = false;
  constructor(
    private httpClient: HttpClientService,
    private orgunitService: OrgUnitService
  ) { }

  ngOnInit() {
  }

  changeOrgUnit(orgunit) {
    this.orgunit = orgunit;
    this.orgunitnames = orgunit.items.map(d => d.name).join(', ');
  }

  checkDate() {  }

  getProviders() {
    this.loading = true;
    this.loading_failed = false;
    this.done_loading = false;
    const facilities = this.orgunitService.getLevel4OrgunitsIds(this.orgunit.visit_locations, this.orgunit.value);
    this.httpClient.postOpenSRP('get-team-members-by-facility-uuid', facilities)
      .subscribe(( data: any[]) => {
        if ( data && data.length !== 0) {
          this.providers = data.map(d => {
            return {
              name: d.person.display,
              id: d.person.uuid
            };
          });
          console.log('prodviders', this.providers);
        }
        this.loading = false;
        this.loading_failed = false;
      }, (error) => {
        this.loading_failed = true;
        this.loading = false;
      });

  }

  setSelectedData(data) {
    console.log(data);
    this.selected_providers = data;
    const providers_names = this.selected_providers.map(d => d.name );
    if (providers_names.length > 3) {
      const extra_length = providers_names.length - 3;
      this.selected_providers_names = providers_names.slice(0, 3).join(', ') + ' and ' + extra_length + ' more ';
    }
  }

  getData() {
    this.data_loading = true;
    this.detailed_loading = true;
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

    this.httpClient.postOpenSRP('get-chw-referrals-list',
      {from_date: start_date, to_date: end_date, chw_uuid})
      .subscribe((data: any) => {
        this.detailed_loading = false;
        this.detailed_values = data.map(item => {
          const chw = this.selected_providers.find(i => i.id === item.service_provider_uuid);
          return {
            ...item,
            service_provider_name: chw ? chw.name : ''
          };
        });
      });
  }

}

