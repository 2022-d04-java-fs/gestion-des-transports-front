import { DistanceTime } from './../models/address-models/distance-time';
import { AddressList } from './../models/address-models/address-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

const apiKey = "0dc33901a5866e72d8c097a478bf435a"

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:HttpClient) { }

  getListAddresses(address:string){
    if(address === null || address === ""){
      return new Observable<AddressList>()
    }
    return this.http.get<AddressList>('https://api-adresse.data.gouv.fr/search/?q=' + address + "&limit=10")
  }

  getDistanceTime(lat1:number, lon1:number, lat2:number, lon2:number){

    return this.http.get<DistanceTime>('https://maps.open-street.com/api/route/?origin=' + lon1 + ',' + lat1 + '&destination=' + lon2 + ',' + lat2 + '&mode=driving&key=' + apiKey)
  }

}
