import { Refresh } from './../models/refresh';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private subjectRefresh = new Subject<Refresh>()
  constructor() { }
  publish(event: Refresh){
    this.subjectRefresh.next(event)
  }

  getRefreshEvent(){
    return this.subjectRefresh.asObservable()
  }
}
