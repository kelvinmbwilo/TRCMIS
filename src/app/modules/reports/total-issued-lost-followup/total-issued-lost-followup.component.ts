import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ExcelDownloadService} from '../../../services/excel-download.service';
import {fadeIn, fadeOut} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-total-issued-lost-followup',
  templateUrl: './total-issued-lost-followup.component.html',
  styleUrls: ['./total-issued-lost-followup.component.scss'],
  animations: [fadeOut, fadeIn]
})
export class TotalIssuedLostFollowupComponent implements OnInit {

  @Input() jsonData: any = [];
  @Input() startDate: any = '';
  @Input() endDate: any;
  @Input() orgUnitName: string = '';
  @Input() report: any;
  @Input() main_title: any;
  rows: string[] = [];
  visibleRows: string[] = [];
  visibleColumns: string[] = [];
  searchRows: string = '';
  searchColumns: string = '';
  hiddenColumns: string[] = [];
  hiddenRows: string[] = [];
  columns: string[] = [
    'JUMLA',
    'WANAUME',
    'WANAWAKE',
  ];
  @ViewChild('dataTable') dataTable: ElementRef;
  totals: any = {};
  constructor(
    private excelService: ExcelDownloadService
  ) { }

  ngOnInit() {
    this.rows = this.jsonData.map(item => item.itemName);
    this.jsonData.forEach((item: any) => {
      this.totals.total = this.addToNUmber(this.totals.total, item.total);
      this.totals.male = this.addToNUmber(this.totals.male, item.male);
      this.totals.female = this.addToNUmber(this.totals.female, item.female);
    });
    this.visibleColumns = [...this.columns];
    this.visibleRows = [...this.rows];
  }


  changeRows(event) {
    this.hiddenRows = this.rows.filter(item => !this.visibleRows.includes(item));
  }

  changeColumn(event) {
    this.hiddenColumns = this.columns.filter(item => !this.visibleColumns.includes(item));
  }

  print() {
    window.print();
  }

  downloadExcel() {
    const startDate = new Date(this.startDate).toISOString().substr(0, 10);
    const endDate = new Date(this.endDate).toISOString().substr(0, 10);
    this.excelService.download1(
      `${this.report.name} from ${startDate} to ${endDate} for ${this.orgUnitName}`,
      this.dataTable.nativeElement
    );
  }

  addToNUmber(prev, next) {
    let sum = 0;
    if (prev) {
      if (next) {
        sum = parseInt(prev + '', 10) + parseInt(next + '', 10);
      } else {
        sum = parseInt(prev + '', 10);
      }
    } else if (next) {
      sum = next;
    }
    return sum;
  }

}

