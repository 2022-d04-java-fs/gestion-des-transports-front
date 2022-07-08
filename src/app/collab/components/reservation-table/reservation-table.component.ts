import { CarpoolService } from './../../../services/carpool.service';
import { Component, OnInit } from '@angular/core';
import { Carpool } from 'src/app/models/carpool';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { CarpoolsByService } from 'src/app/services/carpools-by.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss'],
})
export class ReservationTableComponent implements OnInit {
  carpoolsList: Carpool[] = [];
  carpoolsByDepartureAddressList: Carpool[] = [];
  departureAddressSub!: Subscription;
  departureAddress: string = '';

  constructor(
    private carpoolService: CarpoolService,
    private modalService: NgbModal,
    private carpoolByService: CarpoolsByService
  ) {}

  ngOnInit(): void {
    this.getCarpools();
    this.getCarpoolsByDepartureAddress();
  }

  getCarpools() {
    this.carpoolService
      .getCarpoolsList()
      .subscribe((carpools) => (this.carpoolsList = carpools));
  }

  getCarpoolsByDepartureAddress() {
    this.carpoolByService.data.subscribe((res) => {
      console.log('reservation-table.component >> ', res);
      this.departureAddress = res;
    });
    console.log(
      'reservation-table.component - departureAddress >> ',
      this.departureAddress
    );
    // if (this.departureAddress.length > 0) {
    this.carpoolService
      .getCarpoolsByDepartureAddressList(this.departureAddress)
      .subscribe(
        (carpools) => (this.carpoolsByDepartureAddressList = carpools)
      );
    // }
  }

  openModal(carpool: Carpool) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.carpool = carpool;
  }
}
