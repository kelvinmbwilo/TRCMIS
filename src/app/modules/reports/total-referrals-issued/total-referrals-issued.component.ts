import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-total-referrals-issued',
  templateUrl: './total-referrals-issued.component.html',
  styleUrls: ['./total-referrals-issued.component.scss']
})
export class TotalReferralsIssuedComponent implements OnInit {

  @Input() jsonData: any;
  @Input() startDate: any = '';
  @Input() endDate: any;
  @Input() orgUnitName: string = '';
  @Input() report: any;
  constructor() { }

  ngOnInit() {
  }

}
