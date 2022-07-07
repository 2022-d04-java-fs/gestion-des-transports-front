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
}
