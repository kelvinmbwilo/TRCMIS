import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbanner',
  templateUrl: './topbanner.component.html',
  styleUrls: ['./topbanner.component.scss']
})
export class TopbannerComponent implements OnInit {
  @Input() title = '';
  @Input() image = '';
  @Input() url = '';
  @Input() loading = false;
  constructor() {}

  ngOnInit() {}
}
