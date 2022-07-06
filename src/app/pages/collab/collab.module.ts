
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollabPage } from './collab.page';
import { ListReservationComponent } from 'src/app/components/list-reservation/list-reservation.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';



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
