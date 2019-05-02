import {Component, OnDestroy, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import {fadeIn, ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {HttpClientService} from '../../services/http-client.service';
import {OrgUnitService} from '../../services/org-unit.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  animations: [fadeIn],
  encapsulation: ViewEncapsulation.None,
})
export class ReportsComponent implements OnInit, OnDestroy {
  report_loading: boolean = false;
  loading: boolean = false;
  orgunit: any = null;
  orgunitnames: string = '';
  reportTitle: string = '';
  showReport: boolean = false;
  start_date: any = '';
  end_date: any = '';
  done_loading: boolean = false;
  loading_failed: boolean = false;
  @ViewChild('reportArea') el: ElementRef;
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
  reports: {
    id: string;
    name: string;
    notes: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    active: boolean
  }[] = [];
  current_report = null;
  html_data = null;
  reportId = null;
  jsonData: any;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  preparedReports = [
    '/opensrp/reports/total_registered_clients',
    '/opensrp/reports/total_referrals_issued',
    '/opensrp/reports/total_successful_referrals',
    '/opensrp/reports/total_issued_ltfs',
    '/opensrp/reports/ltfs_feedback',
    '/opensrp/reports/successful_malaria_referrals',
    '/opensrp/reports/total_failed_referrals'
  ];
  constructor(
    private httpClient: HttpClientService,
    private orgunitService: OrgUnitService
    ) {

  }

  ngOnInit() {
    this.report_loading = true;
    this.httpClient.getOpenSRP('available_reports')
    .subscribe((data: any) => {
      this.reports = data;
      this.report_loading = false;
    });

  }

  changeOrgUnit(orgunit) {
    this.orgunit = orgunit;
    this.orgunitnames = orgunit.items.map(d => d.name).join(', ');
    this.html_data = null;
  }

  changeReport(report: any) {
    this.reportTitle = report.name;
    this.showReport = true;
    this.reportId = report.url;
    this.current_report = report;
    this.html_data = null;
    this.loading_failed = false;
    this.loading = false;
    this.jsonData = null;
  }

  ngOnDestroy() {}
  viewSavedChange(view_saved) {

  }

  checkDate() {  }

  backToReports() {
    this.reportTitle = '';
    this.showReport = false;
    this.html_data = null;
    this.jsonData = null;
  }

  getReport() {
    if (this.preparedReports.includes(this.current_report.url)) {
      this.getJsonReport();
    }
    const start_date = new Date(this.start_date).toISOString().substr(0, 10);
    const end_date = new Date(this.end_date).toISOString().substr(0, 10);
    this.html_data = null;
    this.loading = true;
    this.loading_failed = false;
    const facilities = this.orgunitService.getLevel4OrgunitsIds(this.orgunit.visit_locations, this.orgunit.value);
    const reportUrl = this.current_report.url.replace('/opensrp/', '') + '/html';
    const from_date = start_date.replace('-', '/').replace('-', '/');
    const to_date = end_date.replace('-', '/').replace('-', '/');
    this.httpClient.postOpenSRP1(reportUrl,
      {from_date, to_date, facilities})
    .subscribe((data: any) => {
      this.html_data = data;
      this.loading = false;
      this.loading_failed = false;
    }, error => {
       console.log(error);
       this.loading = false;
       this.loading_failed = true;
    });
  }

  getJsonReport() {
    const start_date = new Date(this.start_date).toISOString().substr(0, 10);
    const end_date = new Date(this.end_date).toISOString().substr(0, 10);
    this.html_data = null;
    this.loading = true;
    this.loading_failed = false;
    const facilities = this.orgunitService.getLevel4OrgunitsIds(this.orgunit.visit_locations, this.orgunit.value);
    const reportUrl = this.current_report.url.replace('/opensrp/', '') + '/json';
    const from_date = start_date.replace('-', '/').replace('-', '/');
    const to_date = end_date.replace('-', '/').replace('-', '/');
    this.httpClient.postOpenSRP(reportUrl,
      {from_date, to_date, facilities})
    .subscribe((data: any) => {
      console.log(JSON.stringify(data));
      this.jsonData = data;
    }, error => {
       console.log(error);
       this.loading = false;
       this.loading_failed = true;
    });
  }

}
