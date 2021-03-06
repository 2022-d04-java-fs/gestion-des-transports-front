import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateInput'
})
export class DateInputPipe implements PipeTransform {

  transform(value: NgbDateStruct): string {
    if (value === null){
      return "";
    }
    let day = value.day.toString();
    let month = value.month.toString();
    let year = value.year.toString();
    if (day.length === 1){
      day = '0' + day
    }
    if (month.length === 1){
      month = '0' + month
    }
    return day + '/' + month + '/' + year;
  }

}
