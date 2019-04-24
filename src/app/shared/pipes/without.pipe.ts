import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'without'
})
export class WithoutPipe implements PipeTransform {

  transform(value: any[], property: string, val: any): any {
    if (!property) {
      return value;
    }
    if (!value) {
      return value;
    }
    if (!val) {
      return value;
    }
    return value.filter((v) => !(val.includes(v[property])));
  }

}
