import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent implements OnInit {

  public isCollapsed = false;
  public isModal = true;

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
    }
  ]

  closeResult = '';
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
}
