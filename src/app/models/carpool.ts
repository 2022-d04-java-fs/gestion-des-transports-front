import { CarpoolStatus } from './carpool-status';
import { PrivateVehicle } from './private-vehicle';

export interface Carpool {
  carpool_id: number;
  dateHeure: string;
  departureAddress: string;
  arrivalAddress: string;
  vehicle: {
    model: string;
    brand: string;
  };
  driver: {
    id: number;
    lastname: string;
    firstname: string;
  };
  availableSeats: number;
  status: CarpoolStatus;
}

export interface AddCarpool {
  creatorId: number;
  departureAddress: String;
  arrivalAddress: String;
  distance: number;
  duration: number;
  vehicle: PrivateVehicle;
  availableSeats: number;
  date: String;
}
