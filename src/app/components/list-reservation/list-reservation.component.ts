import { Reservation } from './../../models/reservation';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

const FILTER_PAG_REGEX = /[^0-9]/g;
/**
 * @export
 * @class ListReservationComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent implements OnInit {

  public isCollapsed = false;
  public isModal = true;

  //Données test, à changer après l'installation du back

  public reservationList: Reservation[] = []

  public historyList = [
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "2017-06-22T12:30",
      vehicule: "",
      chauffeur: ""
    },
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "2017-06-22T14:30",
      vehicule: "",
      chauffeur: ""
    }, {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "2017-06-22T12:30",
      vehicule: "",
      chauffeur: ""
    },
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "2017-06-22T14:30",
      vehicule: "",
      chauffeur: ""
    }, {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "2017-06-22T12:30",
      vehicule: "",
      chauffeur: ""
    },
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "2017-06-22T14:30",
      vehicule: "",
      chauffeur: ""
    }
  ]

  currentDate: string = "2017-06-22T13:30";
  datePipe = new DatePipe('en-US');
  page = 1;
  pageSize = 3;

  modalTable: string[] = ['', '', '', '', ''];


  constructor(private modalService: NgbModal, private client: HttpClient) { }
  ngOnInit(): void {
    this.fillTab(this.reservationList, "");
    this.fillTab(this.historyList, "");
    this.findReservations(this.currentDate);
  }
  /**
   * @param content: object
   * @param objet: Reservation
   * Cette fonction permettra d'initialiser les éléments de la fenêtre modale avant de l'ouvrir
   */
  open(content: object, objet: Reservation): void {
    this.modalTable[0] = objet.depart;
    this.modalTable[1] = objet.destination;
    this.modalTable[2] = objet.date;
    this.modalTable[3] = objet.vehicule;
    this.modalTable[4] = objet.chauffeur;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  /**
   * @param liste la liste à compléter
   * @param URL le lien où récupérer les tableaux
  */
  fillTab(liste: Reservation[], URL: string): void {
    this.client.get<Reservation[]>(URL).subscribe({
      next: (reservations: Reservation[]) => {
        liste = reservations
      }
    })
  }
  /**
   * @param dateString la date d'aujourd'hui au format string
   * La fonction permet d'initialiser toutes les réservations qui sont pendant et après la date donnée dans reservationList
  */
  findReservations(dateString: string) {
    let date: number = new Date(dateString).getTime()
    this.historyList.forEach(reservation => {
      if (new Date(reservation.date).getTime() >= date) {
        this.reservationList.push(reservation)
      }
    });
  }
}
