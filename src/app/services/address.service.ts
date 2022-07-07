import { AddressList } from './../models/address-models/address-list';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private addressSubject = new Subject<AddressList>()

  constructor(private http:HttpClient) { }

  getListAddresses(address:string){
    return this.http.get<AddressList>('https://api-adresse.data.gouv.fr/search/?q=' + address.replace(" ", "+") + "&limit=10")
  }

  getObservable(): Observable<AddressList>{
    return this.addressSubject.asObservable()
  }
}
