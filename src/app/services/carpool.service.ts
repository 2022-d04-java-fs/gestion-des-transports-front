import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Carpool } from '../models/carpool';

const URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class CarpoolService {
  private departureSubject = new Subject<string>();
  private arrivalSubject = new Subject<string>();
  private dateSubject = new Subject<string>();

  constructor(private http: HttpClient) {}

  getDepartureSubject() {
    return this.departureSubject;
  }

  getArrivalSubject() {
    return this.arrivalSubject;
  }

  getDateSubject() {
    return this.dateSubject;
  }

  sendData(subject: Subject<string>, data: string) {
    subject.next(data);
  }

  getCarpoolsByDepartureAddressList(
    departureAddress: string
  ): Observable<Carpool[]> {
    return this.http.get<Carpool[]>(
      `${URL}/carpools?departureAddress=${departureAddress}`
    );
  }

  createCarpoolReservation(carpool: Carpool): Observable<Carpool> {
    // TODO par défaut user_id = 2 car pas d'authentification
    // A remplacer avec l'id du user grâce à l'authentification
    return this.http.post<Carpool>(
      `${URL}/users/2/carpools/${carpool.carpool_id}`,
      {}
    );
  }
}
