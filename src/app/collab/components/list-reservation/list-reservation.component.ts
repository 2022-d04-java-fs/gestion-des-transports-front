import { RefreshService } from './../../../providers/refresh.service';
import { Reservation } from 'src/app/models/reservation';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { Refresh } from 'src/app/models/refresh';

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

  public historyList: Reservation[] = []

  EventSub!: Subscription;
  private currentDate: string = "2017-06-22T13:30";
  page = 1;
  pageSize = 3;

  modalTable: string[] = ['', '', '', '', ''];


  constructor(private modalService: NgbModal, private client: HttpClient, private refreshEvent: RefreshService) { }
  ngOnInit(): void {
    this.refresh();
    this.EventSub = this.refreshEvent.getRefreshEvent()
      .pipe(
        filter(refresh => refresh === Refresh.REFRESH)
      )
      .subscribe(
        () => this.refresh()
      );
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
   *
  */
  fillTab(URL: string): void {
    this.client.get<Reservation[]>(URL).subscribe({
      next: (reservations: Reservation[]) => {
        this.historyList = reservations
        this.findReservations(this.currentDate);
      }
    })
  }
  refresh() {
    this.fillTab("assets/reservation.json") //insérer l'URL ici
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
