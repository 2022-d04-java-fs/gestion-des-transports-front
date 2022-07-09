import { CarpoolService } from './../../../services/carpool.service';
import { Component, OnInit } from '@angular/core';
import { Carpool } from 'src/app/models/carpool';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss'],
})
export class ReservationTableComponent implements OnInit {
  carpoolsList: Carpool[] = [];
  gdtEventSub!: Subscription;
  carpoolSub!: Subscription;
  departureAddress: string = '';

  constructor(
    private carpoolService: CarpoolService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.carpoolSub = this.carpoolService
      .getObservable()
      .subscribe((departureAddress) => {
        if (departureAddress.length > 0) {
          this.refreshCarpoolList(departureAddress);
        }
      });
  }

  refreshCarpoolList(departureAddress: string) {
    console.log('DEPARTURE ADDRESS >> ');
    this.carpoolService
      .getCarpoolsByDepartureAddressList(departureAddress)
      .subscribe((v) => (this.carpoolsList = v));
  }

  refreshCarpoolListByArrivalAddress(arrivalAddress: string) {
    this.carpoolService.getObservable().subscribe((arrivalAddress) => {
      console.log(arrivalAddress);
    });
  }

  openModal(carpool: Carpool) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.carpool = carpool;
  }
}
