import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsisText'
})
export class EllipsisTextPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    const words = value.split(' ');
    const limitedText = words.slice(0, 20).join(' ');


    return words.length > 20 ? limitedText + '...' : limitedText;
  }

}
