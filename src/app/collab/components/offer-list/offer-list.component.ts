import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Offer } from './../../../models/offer';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, Subscription } from 'rxjs';
import { Refresh } from 'src/app/models/refresh';
import { RefreshService } from '../../../service/refresh.service';

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


   public historyList: Offer[] = []
   EventSub!: Subscription;
   private currentDate: number = Date.now(); //Sert à tester "2017-06-22T13:30"

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
    fillTab(URL: string): void {
      this.client.get<Offer[]>(URL).subscribe({
        next: (offers: Offer[]) => {
          this.historyList = offers
          this.findOffer(this.currentDate);
        }
      })
    }
    refresh() {
      this.fillTab("assets/offer.json") //insérer l'URL ici
    }
    findOffer(date: number) {
     // let date: number = new Date(dateString).getTime()
      this.historyList.forEach(offer => {
        console.log(new Date(offer.dateHeure).getTime() + ">="+ date + "?")
        if (new Date(offer.dateHeure).getTime() >= date) {
          this.offerList.push(offer)
        }
      });
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
