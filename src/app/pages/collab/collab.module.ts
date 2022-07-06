
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollabPage } from './collab.page';
import { ListReservationComponent } from 'src/app/components/list-reservation/list-reservation.component';



@NgModule({
  declarations: [
    CollabPage,
    ListReservationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CollabPage
  ]
})
export class CollabModule { }
