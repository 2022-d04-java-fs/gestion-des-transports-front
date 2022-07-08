export interface Reservation {
    carpool_id: number,
    dateHeure: string,
    departureAddress: string,
    arrivalAddress: string,
    vehicle: {
        model: string,
        brand: string
    },
    driver: {
        lastname: string,
        firstname: string,
        id: number
    },
    availableSeats: number
}


