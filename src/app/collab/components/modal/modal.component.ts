import { Carpool } from 'src/app/models/carpool';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarpoolService } from 'src/app/services/carpool.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() carpool!: Carpool;
  constructor(
    public activeModal: NgbActiveModal,
    private carpoolService: CarpoolService
  ) {}

  ngOnInit(): void {}

  postData() {
    // TODO : Récupérer l'id du user connecté pour la requête post du back
    // this.createNewReservation();
    this.activeModal.close();
  }

  // createNewReservation() {
  //   this.carpoolService
  //     .createCarpoolReservation(this.carpool)
  //     .subscribe((col) => {
  //       console.log(col);
  //     });
  // }
}
