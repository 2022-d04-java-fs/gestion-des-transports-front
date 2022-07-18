
import { CarpoolService } from 'src/app/services/carpool.service';
import { RefreshService } from './../../../services/refresh.service';
import { Reservation } from 'src/app/models/reservation';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { filter, Subscription } from 'rxjs';
import { Refresh } from 'src/app/models/refresh';

const FILTER_PAG_REGEX = /[^0-9]/g;
const URL = 'https://gestion-des-transports.herokuapp.com/api';
/**
 * @export
 * @class ListReservationComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss'],
})
export class ListReservationComponent implements OnInit {

  public cancelResa!:Reservation

  public isCollapsed = false;
  public isModal = true;

  public reservationList: Reservation[] = [];

  public historyList: Reservation[] = [];

  EventSub!: Subscription;
  private currentDate: number = Date.now(); //Sert à tester "2017-06-22T13:30"
  page = 1;
  pageSize = 3;

  modalTable: string[] = ['', '', '', '', ''];


  constructor(private modalService: NgbModal, private client: HttpClient, private refreshEvent: RefreshService, private carpoolSrv: CarpoolService) { }

  ngOnInit(): void {
    this.refresh();
    this.EventSub = this.refreshEvent
      .getRefreshEvent()
      .pipe(filter((refresh) => refresh === Refresh.REFRESH))
      .subscribe(() => this.refresh());
  }
  /**
   * @param content: object
   * @param objet: Reservation
   * Cette fonction permettra d'initialiser les éléments de la fenêtre modale avant de l'ouvrir
   */
  openDetails(content: object, objet: Reservation): void {
    this.modalTable[0] = objet.departureAddress;
    this.modalTable[1] = objet.arrivalAddress;
    this.modalTable[2] = objet.dateHeure;
    this.modalTable[3] = objet.vehicle.brand + ' ' + objet.vehicle.model;
    this.modalTable[4] = objet.driver.lastname + ' ' + objet.driver.firstname;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  /**
   *
   *
   * @param {string} page
   * La fonction permet de donner la bonne page à renvoyer
   */
  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }
  /**
   *
   * @param input l'élément HTML à modifier
   * La fonction formatte la valeur entrée en nombre
   */
  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  /**
   * @param liste la liste à compléter
   * @param URL le lien où récupérer les tableaux
   *La fonction permer de remplir les deux tableaux en récupérant les données de l'URL
  */
  refresh() {
    this.carpoolSrv.listReservationsByUser().subscribe(reservations => {
      this.reservationList = [];
      this.historyList = [];
      reservations.forEach(reservation => {
        if (new Date(reservation.dateHeure).getTime() >= this.currentDate && reservation.status === "OK"){
          this.reservationList.push(reservation)
        }
        else{
          this.historyList.push(reservation)
        }
      })
      this.reservationList.sort((resa1, resa2) => (new Date(resa1.dateHeure).getTime() > new Date(resa2.dateHeure).getTime()) ? -1:1)
      this.historyList.sort((resa1, resa2) => (new Date(resa1.dateHeure).getTime() > new Date(resa2.dateHeure).getTime()) ? -1:1)
    })
  }


  openCancel(content: object, resa: Reservation): void {
    this.cancelResa = resa;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  cancel():void{
    this.carpoolSrv.cancelCarpoolReservation(this.cancelResa.reservation_id).subscribe(() => this.refresh())
  }
}
