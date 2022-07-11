export interface Offer {
  carpool_id: number,
  dateHeure: string,
  departureAddress: string,
  arrivalAddress: string,
  vehicle: {
      model: string,
      brand: string,
      licensePlate: string,
  },
  availableSeats: number
}

