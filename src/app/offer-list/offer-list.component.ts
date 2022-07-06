import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  public isCollapsed = false;
  public isModal = true;

  public offerList = [
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 12:30",
      marque: "",
      immatriculation: "",
      modèle:"",
      nbVoyageurs:3,
    },
    {
      depart: "Gare de Nantes",
      destination: "Nantes Centre",
      date: "18/06/2017 14:30",
      marque: "",
      immatriculation: "",
      modèle:"",
      nbVoyageurs:8,
    }
  ]

  public historyList = [
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 12:30",
      marque: "",
      immatriculation: "",
      modèle:"",
      nbVoyageurs:3,
    },
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 14:30",
      marque: "",
      immatriculation: "",
      modèle:"",
      nbVoyageurs:1,
    },
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 12:30",
      vehicule: "",
      chauffeur: "",
      nbVoyageurs:4,
    },
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 14:30",
      vehicule: "",
      chauffeur: "",
      nbVoyageurs:3,
    },    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 12:30",
      vehicule: "",
      chauffeur: "",
      nbVoyageurs:5,
    },
    {
      depart: "Gare de Nantes",
      destination: "Gare de Saint-Nazaire",
      date: "22/06/2017 14:30",
      vehicule: "",
      chauffeur: "",
      nbVoyageurs:2,
    },
  ]

  closeResult = '';
  page = 1;
  pageSize = 3;
  modalTable: string[] = ['', '', '', '', ''];


  constructor(private modalService: NgbModal) { }
  ngOnInit(): void {
  }
  /**
   * Parameters: content: any
   * Cette fonction permettra d'ouvrir la fenêtre modale avec Angular
   */
  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getListeValues(objet: any) {
    objet
  }
    selectPage(page: string) {
      this.page = parseInt(page, 10) || 1;
    }

    formatInput(input: HTMLInputElement) {
      input.value = input.value.replace(FILTER_PAG_REGEX, '');

}
  }
