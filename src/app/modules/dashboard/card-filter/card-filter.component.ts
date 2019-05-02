import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrgUnitService} from '../../../services/org-unit.service';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html',
  styleUrls: ['./card-filter.component.scss']
})
export class CardFilterComponent implements OnInit {
  @Input() start_date: any = '';
  @Input() end_date: any = '';
  @Output() reportFilter = new EventEmitter<{from_date: string, to_date: string, facilities: string[], ouName?: string, ouId?: string}>();
  orgunit: any = null;
  orgunitnames: string = '';

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
  constructor(
    private orgunitService: OrgUnitService
  ) { }

  ngOnInit() {
  }

  changeOrgUnit(orgunit) {
    this.orgunit = orgunit;
    this.orgunitnames = orgunit.items.map(d => d.name).join(', ');
  }

  getReport() {
    const start_date = new Date(this.start_date).toISOString().substr(0, 10);
    const end_date = new Date(this.end_date).toISOString().substr(0, 10);
    const facilities = this.orgunitService.getLevel4OrgunitsIds(this.orgunit.visit_locations, this.orgunit.value);
    const ouName = this.orgunitService.getLevel4OrgunitsNames(this.orgunit.visit_locations, this.orgunit.value);
    const ouId = this.orgunitService.getLevel4OrgunitsId(this.orgunit.visit_locations, this.orgunit.value);
    const from_date = start_date.replace('-', '/').replace('-', '/');
    const to_date = end_date.replace('-', '/').replace('-', '/');
    this.reportFilter.emit({
      from_date,
      to_date,
      facilities,
      ouName,
      ouId
    });
  }

}
