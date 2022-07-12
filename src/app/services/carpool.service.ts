import { Reservation } from 'src/app/models/reservation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AddCarpool, Carpool } from '../models/carpool';
import { Offer } from '../models/offer';

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
      `${URL}/carpools/reservations/2/${carpool.carpool_id}`,
      {}
    );
  }

  addCarpool(carpool: AddCarpool) {
    return this.http.post<any>(`${URL}/carpools`, carpool); //url de test, à remplacer par https://gestion-des-transports.herokuapp.com/carpools
  }

  listCarpoolByUser(userID:number){
    return this.http.get<Offer[]>("http://localhost:8080/api/carpools/" + userID ) //url de test, à remplacer par https://gestion-des-transports.herokuapp.com/carpools/reservations/
  }

  cancelCarpoolReservation(reservationId:number){
    return this.http.patch<Reservation>("http://localhost:8080/api/carpools/reservations?reservation_id=" + reservationId, {}) //url de test, à remplacer par https://gestion-des-transports.herokuapp.com/users/{user_id}/reservations/{carpool_id}
  }

  getCarpoolsReservationsByUserId(userID:number){
    return this.http.get<Reservation[]>("http://localhost:8080/api/carpools/reservations?user_id=" + userID)
  }
}
