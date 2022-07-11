import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListReservationComponent } from 'src/app/collab/components/list-reservation/list-reservation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { OfferFormComponent } from '../collab/components/offer-form/offer-form.component';
import { DateInputPipe } from '../collab/pipes/date-input.pipe';
import { DurationPipe } from '../collab/pipes/duration.pipe';
import { DistancePipe } from './pipes/distance.pipe';



@NgModule({
  declarations: [
    ListReservationComponent,
    OfferFormComponent,
    DateInputPipe,
    DurationPipe,
    DistancePipe],
  imports: [
    CommonModule,
    NgbPaginationModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [ListReservationComponent,
    OfferFormComponent]
})
export class CollabModule { }
