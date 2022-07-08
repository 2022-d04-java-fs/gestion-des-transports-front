import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarpoolsByService {
  private dataSource: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Lille'
  );
  data: Observable<string> = this.dataSource.asObservable();

  constructor() {}

  sendData(data: string) {
    console.log('carpools-by >> ', data);
    this.dataSource.next(data);
  }
}
