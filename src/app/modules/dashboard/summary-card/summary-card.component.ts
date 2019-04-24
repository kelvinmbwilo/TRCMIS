import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../../shared/animations/router-animation';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryCardComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @Input() top_title: string;
  @Input() low_title: string;
  @Input() value: number;
  @Input() additional_information: string;
  @Input() image: string;
  @Input() loading: boolean;
  @Input() route: string[];
  constructor() { }

  ngOnInit() {
  }

  goTo() { }

}
