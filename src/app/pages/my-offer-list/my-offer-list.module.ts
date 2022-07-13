import { CollabModule } from 'src/app/collab/collab.module';
import { MyOfferListPage } from './my-offer-list.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    MyOfferListPage,
  ],
  imports: [
    CommonModule,
    CollabModule,
  ],
  exports: [
    MyOfferListPage
  ],
})
export class MyOfferListModule { }
