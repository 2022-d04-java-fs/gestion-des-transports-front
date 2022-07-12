
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListReservationComponent } from 'src/app/collab/components/list-reservation/list-reservation.component';
import { CarpoolReservationPages } from '../carpool-reservation/carpool-reservation.pages';
import { CollabModule } from 'src/app/collab/collab.module';
import { MenuComponent } from 'src/app/collab/components/menu/menu.component';


@NgModule({
  declarations: [
    CarpoolReservationPages,
  MenuComponent],
  imports: [
    CommonModule,
    CollabModule,
    NgbModule
  ],
  exports: [CarpoolReservationPages]
})
export class CarpoolReservationModule { }
