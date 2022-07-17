
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AddCarpool, Carpool } from '../models/carpool';
import { Offer } from '../models/offer';
import { Reservation } from '../models/reservation';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CarpoolService {
  private departureSubject = new Subject<string>();
  private arrivalSubject = new Subject<string>();
  private dateSubject = new Subject<string>();

  private apiUrl: string;

  constructor(private http: HttpClient, private authSrv: AuthService) {
    this.apiUrl=environment.apiUrl;
  }

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
      `${this.apiUrl}carpools?departureAddress=${departureAddress}`
    );
  }

  createCarpoolReservation(carpool: Carpool): Observable<Carpool> {
    return this.http.post<Carpool>(
      `${this.apiUrl}carpools/reservations/${this.authSrv.getUserId()}/${carpool.carpool_id}`,
      {}
    );
  }

  addCarpool(carpool: AddCarpool) {
    return this.http.post<any>(`${this.apiUrl}carpools`, carpool);
  }

  cancelCarpoolReservation(reservationId:number){
    return this.http.patch<Reservation>(`${this.apiUrl}carpools/reservations?reservation_id=${reservationId}`, {});
  }

  cancelCarpool(carpoolId:number){
    return this.http.patch<Carpool>(`${this.apiUrl}carpools?carpool_id=${carpoolId}`, {});
  }

  getCarpoolsReservationsByUserId(userID:number){
    return this.http.get<Reservation[]>(`${this.apiUrl}carpools/reservations?user_id=${userID}`)
  }

  listCarpoolByUser() {
    return this.http.get<Offer[]>(`${this.apiUrl}carpools?user_id=${this.authSrv.getUserId()}`);
  }

  listReservationsByUser(){
    return this.http.get<Reservation[]>(`${this.apiUrl}carpools/reservations?user_id=${this.authSrv.getUserId()}`);
  }
}
