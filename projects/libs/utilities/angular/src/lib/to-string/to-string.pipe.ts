import { Pipe, PipeTransform } from '@angular/core';
import { notNullUndefined } from '@qls/utilities/core';

@Pipe({
  standalone: true,
  name: 'toString'
})
export class ToStringPipe implements PipeTransform {
  transform(value: unknown): string {
    if (notNullUndefined(value)) {
      return String(value);
    }

    return '';
  }
}
