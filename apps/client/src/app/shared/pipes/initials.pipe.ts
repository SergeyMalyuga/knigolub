import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
    transform(value: string) {
        if (!value) return '';
        const matches = value.match(/\p{Lu}/ug);
        return matches ? matches.join('') : '';
    }
}
