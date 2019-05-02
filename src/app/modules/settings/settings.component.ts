import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  activeLinkIndex = -1;
  title = 'System Settings';
  navLinks = [
    {
      label: 'Services',
      link: ['', 'settings', 'services'],
      index: 0
    }, {
      label: 'Indicators',
      link: ['', 'settings', 'indicators'],
      index: 1
    }, {
      label: 'Referral Type',
      link: ['', 'settings', 'reffereal-type'],
      index: 2
    }, {
      label: 'Referral Feedback',
      link: ['', 'settings', 'reffereal-feedback'],
      index: 2
    }, {
      label: 'Registration Reason',
      link: ['', 'settings', 'registration-reason'],
      index: 2
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
