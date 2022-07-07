
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollabPage } from './collab.page';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListReservationComponent } from 'src/app/collab/components/list-reservation/list-reservation.component';



@NgModule({
  declarations: [
    CollabPage,
    ListReservationComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule
  ],
  exports: [
    CollabPage
  ]
})
export class CollabModule { }
