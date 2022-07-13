import { CollabModule } from 'src/app/collab/collab.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferPage } from './offer.page';




@NgModule({
  declarations: [
    OfferPage
  ],
  imports: [
    CommonModule,
    CollabModule
  ],
  exports:[
    OfferPage
  ]
})
export class OfferModule { }
