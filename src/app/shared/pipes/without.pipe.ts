import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'without'
})
export class WithoutPipe implements PipeTransform {

  transform(value: any[], property: string, val: any): any {
    console.log({value}, {property}, {val});
    if (!property) {
      return value;
    }
    if (!value) {
      return value;
    }
    if (!val) {
      return value;
    }
    console.log(val);
    return value.filter((v) => !(val.includes(v[property])));
  }

}
