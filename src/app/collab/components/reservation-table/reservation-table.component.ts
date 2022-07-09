import { CarpoolService } from './../../../services/carpool.service';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Carpool } from 'src/app/models/carpool';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss'],
})
export class ReservationTableComponent implements OnInit, AfterContentInit {
  carpoolsList: Carpool[] = [];
  gdtEventSub!: Subscription;
  departureAddress: string = '';
  carpoolSubscription!: Subscription;

  constructor(
    private carpoolService: CarpoolService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.addCarpoolsInArray();
    this.filterCarpoolsByArrivalAddress();
    this.filterCarpoolsByDate();
  }

  addCarpoolsInArray() {
    this.carpoolSubscription = this.carpoolService
      .getDepartureSubject()
      .subscribe((res) => {
        if (res.length > 0) {
          this.carpoolService
            .getCarpoolsByDepartureAddressList(res)
            .subscribe((carpools) => (this.carpoolsList = carpools));
        }
      });
  }

  filterCarpoolsByArrivalAddress() {
    this.carpoolSubscription = this.carpoolService
      .getArrivalSubject()
      .subscribe((res) => {
        this.carpoolsList = this.carpoolsList.filter(
          (carpool) => carpool.arrivalAddress === res
        );
      });
  }

  filterCarpoolsByDate() {
    this.carpoolSubscription = this.carpoolService
      .getDateSubject()
      .subscribe((res) => {
        this.carpoolsList = this.carpoolsList.filter((carpool) =>
          carpool.dateHeure.includes(res)
        );
      });
  }

  openModal(carpool: Carpool) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.carpool = carpool;
  }
}
