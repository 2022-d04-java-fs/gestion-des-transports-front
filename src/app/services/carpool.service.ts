import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarpoolService {

  constructor(private http:HttpClient) { }
  listCarpoolByUser(userID:number){
    return this.http.get("http://localhost:8080/api/carpools/reservations/:userID" + userID ) //url de test, à remplacer par https://gestion-des-transports.herokuapp.com/carpools/reservations/:userID

  }
}
