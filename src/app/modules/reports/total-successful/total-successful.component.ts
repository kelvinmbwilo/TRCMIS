import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-total-successful',
  templateUrl: './total-successful.component.html',
  styleUrls: ['./total-successful.component.scss']
})
export class TotalSuccessfulComponent implements OnInit {

  @Input() jsonData: any;
  @Input() startDate: any = '';
  @Input() endDate: any;
  @Input() orgUnitName: string = '';
  @Input() report: any;
  constructor() { }

  ngOnInit() {
  }

}
