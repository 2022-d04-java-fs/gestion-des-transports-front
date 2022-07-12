import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AddCarpool, Carpool } from '../models/carpool';
import { Offer } from '../models/offer';
import { Reservation } from '../models/reservation';

const URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class CarpoolService {
  private departureSubject = new Subject<string>();
  private arrivalSubject = new Subject<string>();
  private dateSubject = new Subject<string>();

  constructor(private http: HttpClient, private authSrv: AuthService) {}

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
    return this.http.post<Carpool>(
      `${URL}/users/${this.authSrv.getUserId()}/carpools/${carpool.carpool_id}`,
      {}
    );
  }

  addCarpool(carpool: AddCarpool) {
    return this.http.post<any>(`${URL}/carpools`, carpool); //url de test, à remplacer par https://gestion-des-transports.herokuapp.com/carpools
  }
  listCarpoolByUser() {
    return this.http.get<Offer[]>(`${URL}/carpools/reservations/` + this.authSrv.getUserId()); //url de test, à remplacer par https://gestion-des-transports.herokuapp.com/carpools/reservations/
  }

  listReservationsByUser(){
    return this.http.get<Reservation[]>("http://localhost:8080/api/users/"+ this.authSrv.getUserId()+"/reservations" )
  }
}
