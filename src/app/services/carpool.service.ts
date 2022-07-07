import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carpool } from '../models/carpool';

const URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class CarpoolService {
  constructor(private http: HttpClient) {}

  getCarpoolsList(): Observable<Carpool[]> {
    return this.http.get<Carpool[]>(`${URL}/carpools`);
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
