import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showButton'
})
export class ShowButtonPipe implements PipeTransform {

  transform(value: any, property: string): any {
    const show = true;
    if (value.hasOwnProperty('actionButtons')) {
      if (value.actionButtons.hasOwnProperty(property)) {
        return value.actionButtons[property];
      }
    }
    return show;
  }

}
