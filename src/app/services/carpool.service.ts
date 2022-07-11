import { Offer } from './../models/offer';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarpoolService {

  constructor(private http:HttpClient) { }
  listCarpoolByUser(userID:number){
    return this.http.get<Offer[]>("http://localhost:8080/api/carpools/reservations/" + userID ) //url de test, à remplacer par https://gestion-des-transports.herokuapp.com/carpools/reservations/

  }
}
