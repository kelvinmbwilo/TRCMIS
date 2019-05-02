import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ExcelDownloadService} from '../../../services/excel-download.service';
import {fadeIn, fadeOut} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-successful-maralia-referals',
  templateUrl: './successful-maralia-referals.component.html',
  styleUrls: ['./successful-maralia-referals.component.scss'],
  animations: [fadeIn, fadeOut]
})
export class SuccessfulMaraliaReferalsComponent implements OnInit {

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
    'JUMLA ME',
    'JUMLA KE',
    'CHINI YA MIAKA 5 ME',
    'CHINI YA MIAKA 5 KE',
    'JUU YA MIAKA 5 ME',
    'JUU YA MIAKA 5 KE',
  ];
  @ViewChild('dataTable') dataTable: ElementRef;
  totals: any = {};
  constructor(
    private excelService: ExcelDownloadService
  ) { }

  ngOnInit() {
    this.rows = ['RUFAA ZA MALARIA ZILIZOFANYIKA'];
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

}

