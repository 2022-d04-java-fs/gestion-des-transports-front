import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateInputPipe } from './pipes/date-input.pipe';



@NgModule({
  declarations: [
    OfferFormComponent,
    DateInputPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports:[
    OfferFormComponent
  ]
})
export class SharedModule { }
