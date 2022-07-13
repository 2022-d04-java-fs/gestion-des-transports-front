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
  public isCollapsed = false;
  public isModal = true;

  public reservationList: Reservation[] = [];

  public historyList: Reservation[] = [];

  EventSub!: Subscription;
  private currentDate: number = Date.now(); //Sert à tester "2017-06-22T13:30"
  page = 1;
  pageSize = 3;

  modalTable: string[] = ['', '', '', '', ''];

  constructor(
    private modalService: NgbModal,
    private client: HttpClient,
    private refreshEvent: RefreshService
  ) {}
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
  open(content: object, objet: Reservation): void {
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
  fillTab(URL: string): void {
    this.client.get<Reservation[]>(URL).subscribe((reservations) => {
      this.historyList = reservations;
      this.findReservations(this.currentDate);
    });
  }
  /**
   * La fonction fera une mise à jour des tableaux à chaque appel
   */
  refresh() {
    this.fillTab(`${URL}/carpools?user_id=2`); //insérer l'URL ici
    //Ici, l'url devra prendre l'ID de connexion de l'utilisateur
  }
  /**
   * @param dateString la date d'aujourd'hui au format string
   * La fonction permet d'initialiser toutes les réservations qui sont pendant et après la date donnée dans reservationList
   */
  findReservations(date: number) {
    this.historyList.forEach((reservation) => {
      if (new Date(reservation.dateHeure).getTime() >= date) {
        this.reservationList.push(reservation);
      }
    });
  }
}
