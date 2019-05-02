import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appTableStyle]'
})
export class TableStyleDirective implements AfterViewInit {
  @Input() color: string = 'red';

  constructor(private el: ElementRef) {
  }

  // afterViewInit lifecycle hook runs after DOM is rendered
  ngAfterViewInit() {
    // get anchor element
    console.log('kwenye directive hapa');
    const anchorEl = this.el.nativeElement.querySelector('table');
    console.log({anchorEl});
    // assign color
    if (anchorEl) {
      anchorEl.style.backgroundColor = this.color;
    }
  }

}
