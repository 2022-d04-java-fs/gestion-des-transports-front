import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListReservationComponent } from 'src/app/collab/components/list-reservation/list-reservation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ListReservationComponent],
  imports: [
    CommonModule,
    NgbPaginationModule
  ],
  exports: [ListReservationComponent]
})
export class CollabModule { }
