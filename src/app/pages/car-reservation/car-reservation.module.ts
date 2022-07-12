import { AppRoutingModule } from './../../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarReservationPage } from './car-reservation.page';
import { CollabModule } from 'src/app/collab/collab.module';

@NgModule({
  declarations: [CarReservationPage],
  imports: [CommonModule, CollabModule],
  exports: [CarReservationPage],
})
export class CarReservationModule {}
