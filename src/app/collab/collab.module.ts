import { OfferListComponent } from './components/offer-list/offer-list.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
OfferListComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule

  ],
  exports : [
OfferListComponent
  ],
})
export class CollabModule { }
