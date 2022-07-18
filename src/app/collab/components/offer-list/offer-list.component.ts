import { Carpool } from 'src/app/models/carpool';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Offer } from './../../../models/offer';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, Subscription } from 'rxjs';
import { Refresh } from 'src/app/models/refresh';
import { RefreshService } from '../../../services/refresh.service';
import { CarpoolService } from 'src/app/services/carpool.service';
import { CarpoolStatus } from 'src/app/models/carpool-status';

const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  public isCollapsed = false;
  public isModal = true;

  public offerList: Offer[] = []
  cancelOffer!:Offer

  public historyList: Offer[] = []
  EventSub!: Subscription;
  private currentDate: number = Date.now(); //Sert à tester "2017-06-22T13:30"

  page = 1;
  pageSize = 3;
  modalTable: string[] = ['', '', '', '', ''];


  constructor(private modalService: NgbModal, private client: HttpClient, private refreshEvent: RefreshService, private carpoolService: CarpoolService) { }
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
  fillTab(): void {

    this.carpoolService.listCarpoolByUser().subscribe(offerListByUser => {
      this.offerList = [];
      this.historyList = [];
      offerListByUser.forEach(offer => {
        if (new Date(offer.dateHeure).getTime() >= this.currentDate && offer.status == CarpoolStatus.OK) {
          this.offerList.push(offer)
        }
        else {
          this.historyList.push(offer)
        }
      });
      this.offerList.sort((resa1, resa2) => (new Date(resa1.dateHeure).getTime() > new Date(resa2.dateHeure).getTime()) ? -1:1)
      this.historyList.sort((resa1, resa2) => (new Date(resa1.dateHeure).getTime() > new Date(resa2.dateHeure).getTime()) ? -1:1)
    })
  }
  refresh() {
    this.fillTab()
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

  openCancel(content: object, offer: Offer): void {
    this.cancelOffer = offer;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  cancel():void{
    this.carpoolService.cancelCarpool(this.cancelOffer.carpool_id).subscribe(() => this.refresh());
  }
}
