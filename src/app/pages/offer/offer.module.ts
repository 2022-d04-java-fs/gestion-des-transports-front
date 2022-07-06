import { SharedModule } from './../../shared/shared.module';
import { AppModule } from './../../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferPage } from './offer.page';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OfferPage
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    OfferPage
  ]
})
export class OfferModule { }
