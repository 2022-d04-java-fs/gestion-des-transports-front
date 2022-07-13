import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarpoolReservationPages } from '../carpool-reservation/carpool-reservation.pages';
import { CollabModule } from 'src/app/collab/collab.module';


@NgModule({
  declarations: [
    CarpoolReservationPages],
  imports: [
    CommonModule,
    CollabModule,
    NgbModule
  ],
  exports: [CarpoolReservationPages]
})
export class CarpoolReservationModule { }
