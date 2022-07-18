import { CarpoolStatus } from './carpool-status';
export interface Reservation {
    reservation_id: number
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
    availableSeats: number,
    status: CarpoolStatus
}


