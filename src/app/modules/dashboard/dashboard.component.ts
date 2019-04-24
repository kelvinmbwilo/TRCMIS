import { Component, OnInit } from '@angular/core';
import {ROUTE_ANIMATIONS_ELEMENTS} from '../../shared/animations/router-animation';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Report 1', cols: 1, rows: 1 },
          { title: 'Report  2', cols: 1, rows: 1 },
          { title: 'Report  3', cols: 1, rows: 1 },
          { title: 'Report  4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Report  1', cols: 2, rows: 1 },
        { title: 'Report  2', cols: 1, rows: 1 },
        { title: 'Report  3', cols: 1, rows: 2 },
        { title: 'Report  4', cols: 1, rows: 1 }
      ];
    })
  );

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  constructor(private breakpointObserver: BreakpointObserver) {}
}
