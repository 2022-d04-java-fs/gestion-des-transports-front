import { PrivateVehicle } from './private-vehicle';
export interface Carpool {
  creatorId:number;
  departureAddress: String;
  arrivalAddress: String;
  distance:number;
  duration:number;
  vehicle: PrivateVehicle
  availableSeats:number;
  date:String;
}
