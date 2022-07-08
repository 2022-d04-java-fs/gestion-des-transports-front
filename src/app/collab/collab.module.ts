import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferFormComponent } from '../collab/components/offer-form/offer-form.component';
import { DateInputPipe } from '../collab/pipes/date-input.pipe';
import { DurationPipe } from '../collab/pipes/duration.pipe';
import { DistancePipe } from './pipes/distance.pipe';



@NgModule({
  declarations: [
    OfferFormComponent,
    DateInputPipe,
    DurationPipe,
    DistancePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,

  ],
  exports:[
    OfferFormComponent
  ]
})
export class CollabModule { }
