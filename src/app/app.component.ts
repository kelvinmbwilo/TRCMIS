import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'htmr-web';
  links = ['link1', 'link1', 'link1' ];
  showInfo(link) {}
}
