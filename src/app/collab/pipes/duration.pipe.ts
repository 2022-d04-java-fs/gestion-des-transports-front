import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string{
    let hour = value/3600|0
    let minutes = (value - hour * 3600)/60|0
    return hour + " h " + minutes + " min";
  }

}
