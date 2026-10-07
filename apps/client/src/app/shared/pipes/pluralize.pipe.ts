import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pluralize' })
export class PluralizePipe implements PipeTransform {
  transform(count: number, one: string, few: string, many: string): string {
    if (count < 0) count = Math.abs(count);

    const lastTwo = count % 100;
    const lastOne = count % 10;

    if (lastTwo >= 11 && lastTwo <= 19) {
      return many;
    }

    if (lastOne === 1) {
      return one;
    }
    if (lastOne >= 2 && lastOne <= 4) {
      return few;
    }

    return many;
  }
}
