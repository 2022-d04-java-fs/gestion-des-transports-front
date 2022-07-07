import { CarpoolService } from './../../../services/carpool.service';
import { Component, OnInit } from '@angular/core';
import { Carpool } from 'src/app/models/carpool';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss'],
})
export class ReservationTableComponent implements OnInit {
  carpoolsList: Carpool[] = [];

  constructor(
    private carpoolService: CarpoolService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCarpools();
  }

  getCarpools() {
    this.carpoolService
      .getCarpoolsList()
      .subscribe((carpools) => (this.carpoolsList = carpools));
  }

  openModal(carpool: Carpool) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.carpool = carpool;
  }
}
