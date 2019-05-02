import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-total-failed-referrals',
  templateUrl: './total-failed-referrals.component.html',
  styleUrls: ['./total-failed-referrals.component.scss']
})
export class TotalFailedReferralsComponent implements OnInit {

  @Input() jsonData: any;
  @Input() startDate: any = '';
  @Input() endDate: any;
  @Input() orgUnitName: string = '';
  @Input() report: any;
  constructor() { }

  ngOnInit() {
  }

}
