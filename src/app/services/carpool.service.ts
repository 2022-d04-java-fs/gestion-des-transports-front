import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Carpool } from './../models/carpool';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarpoolService {

  carpoolSubject = new Subject<Carpool>()

  constructor(private http:HttpClient) { }

  addCarpool(carpool:Carpool){
    return this.http.post<any>("http://localhost:8080/api/carpools",carpool) //url de test, à remplacer par https://gestion-des-transports.herokuapp.com/carpools
  }
}
