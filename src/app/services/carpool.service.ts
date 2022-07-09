import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Carpool } from '../models/carpool';

const URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class CarpoolService {
  private carpoolSub = new BehaviorSubject<string>('');

  sendData(data: string) {
    this.carpoolSub.next(data);
  }

  getObservable() {
    return this.carpoolSub.asObservable();
  }

  constructor(private http: HttpClient) {}

  getCarpoolsList(): Observable<Carpool[]> {
    return this.http.get<Carpool[]>(`${URL}/carpools`);
  }

  getCarpoolsByDepartureAddressList(
    departureAddress: String
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
