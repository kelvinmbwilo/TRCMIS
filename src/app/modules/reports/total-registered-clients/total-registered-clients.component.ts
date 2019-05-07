import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {fadeIn, fadeOut} from '../../../shared/animations/router-animation';
import {ExcelDownloadService} from '../../../services/excel-download.service';

@Component({
  selector: 'app-total-registered-clients',
  templateUrl: './total-registered-clients.component.html',
  styleUrls: ['./total-registered-clients.component.scss'],
  animations: [fadeIn, fadeOut]
})
export class TotalRegisteredClientsComponent implements OnInit {

  @Input() jsonData: any[] = [];
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
    'CHINI YA MWAKA MMOJA ME',
    'CHINI YA MWAKA MMOJA KE',
    'MIAKA 1-5 ME',
    'MIAKA 1-5 KE',
    'MIAKA 6 - 9 ME',
    'MIAKA 6 - 9 KE',
    'MIAKA 10 - 14 ME',
    'MIAKA 10 - 14 KE',
    'MIAKA 15 - 19 ME',
    'MIAKA 15 - 19 KE',
    'MIAKA 20 - 24 ME',
    'MIAKA 20 - 24 KE',
    'MIAKA 25 - 49 ME',
    'MIAKA 25 - 49 KE',
    'MIAKA 50 - 59 ME',
    'MIAKA 50 - 59 KE',
    'MIAKA 60+ ME',
    'MIAKA 60+ KE',
  ];
  @ViewChild('dataTable') dataTable: ElementRef;
  totals: any = {};
  constructor(
    private excelService: ExcelDownloadService
  ) { }

  ngOnInit() {
    this.rows = this.jsonData.map(item => item.itemName);
    this.jsonData.forEach((item: any) => {
      this.totals.totalMale = this.addToNUmber(this.totals.totalMale, item.totalMale);
      this.totals.totalFemale = this.addToNUmber(this.totals.totalFemale, item.totalFemale);
      this.totals.lessThan1Male = this.addToNUmber(this.totals.lessThan1Male, item.lessThan1Male);
      this.totals.lessThan1Female = this.addToNUmber(this.totals.lessThan1Female, item.lessThan1Female);
      this.totals.oneTofiveMale = this.addToNUmber(this.totals.oneTofiveMale, item.oneTofiveMale);
      this.totals.oneTofiveFemale = this.addToNUmber(this.totals.oneTofiveFemale, item.oneTofiveFemale);
      this.totals.sixToNineMale = this.addToNUmber(this.totals.sixToNineMale, item.sixToNineMale);
      this.totals.sixToNineFemale = this.addToNUmber(this.totals.sixToNineFemale, item.sixToNineFemale);
      this.totals.tenToFourteenMale = this.addToNUmber(this.totals.tenToFourteenMale, item.tenToFourteenMale);
      this.totals.tenToFourteenFemale = this.addToNUmber(this.totals.tenToFourteenFemale, item.tenToFourteenFemale);
      this.totals.fifteenToNineteenMale = this.addToNUmber(this.totals.fifteenToNineteenMale, item.fifteenToNineteenMale);
      this.totals.fifteenToNineteenFemale = this.addToNUmber(this.totals.fifteenToNineteenFemale, item.fifteenToNineteenFemale);
      this.totals.twentyToTwentyFourMale = this.addToNUmber(this.totals.twentyToTwentyFourMale, item.twentyToTwentyFourMale);
      this.totals.twentyToTwentyFourFemale = this.addToNUmber(this.totals.twentyToTwentyFourFemale, item.twentyToTwentyFourFemale);
      this.totals.twentyFiveToFourtyNineMale = this.addToNUmber(this.totals.twentyFiveToFourtyNineMale, item.twentyFiveToFourtyNineMale);
      this.totals.twentyFiveToFourtyNineFemale = this.addToNUmber(this.totals.twentyFiveToFourtyNineFemale, item.twentyFiveToFourtyNineFemale);
      this.totals.fiftyToFiftyNineMale = this.addToNUmber(this.totals.fiftyToFiftyNineMale, item.fiftyToFiftyNineMale);
      this.totals.fiftyToFiftyNineFemale = this.addToNUmber(this.totals.fiftyToFiftyNineFemale, item.fiftyToFiftyNineFemale);
      this.totals.aboveSixtyMale = this.addToNUmber(this.totals.aboveSixtyMale, item.aboveSixtyMale);
      this.totals.aboveSixtyFemale = this.addToNUmber(this.totals.aboveSixtyFemale, item.aboveSixtyFemale);
    });
    this.visibleColumns = [...this.columns];
    this.visibleRows = [...this.rows];
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
