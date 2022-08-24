import { PipeTransform, Injectable, Pipe }     from '@angular/core';
import { DecimalPipe } from '@angular/common';
@Pipe({
  name: 'replaceCurrency',
})
@Injectable()
export class ReplaceCurrencyPipe implements PipeTransform {
  dot = '.' as const;
  comma = ',' as const;
  comodin = '!' as const;
  constructor(private decimalPipe: DecimalPipe){}
  transform(item: any, decimal = 0): any {
    if(item === null || item === undefined || Number.isNaN(item) || item === "null") return "";
    item = String(item);
    if (item === "null") {
      console.log('error');
    }
    item = this.decimalPipe.transform(item, "1." + decimal + "-3");
    if (item.includes('.') && decimal === 0) {
      item = item.split('.')[0];
    } else if (item.includes('.') && decimal > 0) {
      let factor = 1;
      for (let i = 1; i <= decimal; i++) {
        factor = factor * 10;
      }
      item = item.replaceAll(this.comma, '');
      item = String(Math.trunc(item * factor) / factor);
      item = this.decimalPipe.transform(item, "1." + decimal + "-3");
    }
    item = item.replaceAll(this.dot, this.comodin);
    item = item.replaceAll(this.comma, this.dot);
    item = item.replaceAll(this.comodin, this.comma);
    return item;
  }
}
