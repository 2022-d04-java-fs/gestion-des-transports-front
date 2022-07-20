import { CarpoolService } from './../../../services/carpool.service';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Carpool } from 'src/app/models/carpool';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Subscription } from 'rxjs';
import { CarpoolStatus } from 'src/app/models/carpool-status';
import { ToastService } from 'src/app/services/toast.service';

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
  message: string = '';

  constructor(
    private carpoolService: CarpoolService,
    private modalService: NgbModal,
    private toastService: ToastService
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
      .subscribe({
        next: (res) => {
          this.message = 'Recherche en cours...';
          this.carpoolService.getCarpoolsByDepartureAddressList(res).subscribe({
            next: (carpools) => {
              this.carpoolsList = carpools.filter(
                (carpool) =>
                  new Date(carpool.dateHeure) > new Date() &&
                  carpool.status === CarpoolStatus.OK
              );

              if (this.carpoolsList.length === 0) {
                this.showError();
                this.message = 'Aucun covoiturage trouvé';
              }
            },

            error: (err) => {
              this.carpoolsList = [];
              this.showError();
              this.message = 'Aucun covoiturage trouvé';
            },
          });
        },
      });
  }

  showError() {
    this.toastService.show('Aucun covoiturage trouvé', {
      classname: 'bg-danger text-light',
      delay: 4000,
      autohide: true,
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
