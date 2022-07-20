import { Offer } from './../../../models/offer';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, Subscription } from 'rxjs';
import { Refresh } from 'src/app/models/refresh';
import { RefreshService } from '../../../services/refresh.service';
import { CarpoolService } from 'src/app/services/carpool.service';
import { CarpoolStatus } from 'src/app/models/carpool-status';
import { ToastService } from 'src/app/services/toast.service';

const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
})
export class OfferListComponent implements OnInit {
  public isCollapsed = false;
  public isModal = true;
  public offerList: Offer[] = [];
  cancelOffer!: Offer;
  public historyList: Offer[] = [];
  EventSub!: Subscription;
  page = 1;
  pageSize = 3;
  modalTable: string[] = ['', '', '', '', ''];
  public message: string = '';

  constructor(
    private modalService: NgbModal,
    private refreshEvent: RefreshService,
    private carpoolService: CarpoolService,
    private toastSrv: ToastService
  ) {}
  ngOnInit(): void {
    this.refresh();
    this.EventSub = this.refreshEvent
      .getRefreshEvent()
      .pipe(filter((refresh) => refresh === Refresh.REFRESH))
      .subscribe(() => this.refresh());
  }
  fillTab(): void {
    this.message = 'Recherche en cours...';
    this.carpoolService.listCarpoolByUser().subscribe({
      next: (offerListByUser) => {
        this.offerList = offerListByUser.filter(
          (offer) =>
            new Date(offer.dateHeure) > new Date() &&
            offer.status === CarpoolStatus.OK
        );

        this.historyList = offerListByUser.filter(
          (offer) => new Date(offer.dateHeure) < new Date()
        );

        this.offerList.sort(
          (a, b) =>
            new Date(b.dateHeure).getTime() - new Date(a.dateHeure).getTime()
        );

        this.historyList.sort(
          (a, b) =>
            new Date(b.dateHeure).getTime() - new Date(a.dateHeure).getTime()
        );
      },
      error: (err) => {
        this.message = 'Une erreur est survenue';
        this.showError();
      },
      complete: () => {},
    });
  }

  showError() {
    this.toastSrv.show('Une erreur est survenue', {
      classname: 'bg-danger text-light',
      delay: 5000,
      autohide: true,
    });
  }

  refresh() {
    this.fillTab();
  }

  /**
   * Parameters: content: any
   * Cette fonction permettra d'ouvrir la fenêtre modale avec Angular
   */
  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getListeValues(objet: any) {
    objet;
  }
  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  openCancel(content: object, offer: Offer): void {
    this.cancelOffer = offer;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
    });
  }

  cancel(): void {
    this.showStandard();
    this.carpoolService
      .cancelCarpool(this.cancelOffer.carpool_id)
      .subscribe(() => {
        this.refresh();
        this.showSuccess();
      });
  }

  showSuccess() {
    this.toastSrv.show('Vous avez bien annulé cette annonce !', {
      classname: 'bg-success text-light',
      delay: 4000,
      autohide: true,
      headertext: 'Bravo',
    });
  }

  showStandard() {
    this.toastSrv.show('Annulation en cours...', {
      delay: 5000,
      autohide: true,
    });
  }
}
