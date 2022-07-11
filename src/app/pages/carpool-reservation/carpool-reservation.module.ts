
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListReservationComponent } from 'src/app/collab/components/list-reservation/list-reservation.component';
import { CarpoolReservationPages } from '../carpool-reservation/carpool-reservation.pages';
import { CollabModule } from 'src/app/collab/collab.module';


@NgModule({
  declarations: [
    CarpoolReservationPages],
  imports: [
    CommonModule,
    CollabModule
  ],
  exports: [CarpoolReservationPages]
})
export class CarpoolReservationModule { }
