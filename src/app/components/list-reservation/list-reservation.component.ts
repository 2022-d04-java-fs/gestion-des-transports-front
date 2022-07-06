import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent implements OnInit {

  public isCollapsed = false;
  public isModal = true;

  //Données test, à changer après l'installation du back

  public reservationList = [
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 12:30",
      vehicule: "",
      chauffeur: ""
    }
  ]

  public historyList = [
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 12:30",
      vehicule: "",
      chauffeur: ""
    },
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 14:30",
      vehicule: "",
      chauffeur: ""
    },    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 12:30",
      vehicule: "",
      chauffeur: ""
    },
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 14:30",
      vehicule: "",
      chauffeur: ""
    },    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 12:30",
      vehicule: "",
      chauffeur: ""
    },
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 14:30",
      vehicule: "",
      chauffeur: ""
    },
  ]

  page = 1;
  pageSize = 3;

  modalTable: string[] = ['', '', '', '', ''];


  constructor(private modalService: NgbModal) { }
  ngOnInit(): void {
  }
  /**
   * Parameters: content: any et objet: any
   * Cette fonction permettra d'initialiser les éléments de la fenêtre modale avant de l'ouvrir
   */
  open(content: any, objet: any): void {
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
}
