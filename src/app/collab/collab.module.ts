import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CarpoolAccordionComponent } from './components/carpool-accordion/carpool-accordion.component';
import { CriteriaFormComponent } from './components/criteria-form/criteria-form.component';
import { BackBtnComponent } from './components/back-btn/back-btn.component';
import { ReservationTableComponent } from './components/reservation-table/reservation-table.component';
import { ModalComponent } from './components/modal/modal.component';
import { DurationPipe } from './pipes/duration.pipe';
import { ToastGlobalComponent } from './components/toast-global/toast-global.component';
import { ListReservationComponent } from 'src/app/collab/components/list-reservation/list-reservation.component';
import { OfferFormComponent } from '../collab/components/offer-form/offer-form.component';
import { DateInputPipe } from '../collab/pipes/date-input.pipe';
import { DistancePipe } from './pipes/distance.pipe';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    OfferListComponent,
    CarpoolAccordionComponent,
    CriteriaFormComponent,
    BackBtnComponent,
    ReservationTableComponent,
    ModalComponent,
    ToastGlobalComponent,
    ListReservationComponent,
    OfferFormComponent,
    DateInputPipe,
    DurationPipe,
    DistancePipe,
    MenuComponent
  ],
  imports: [
    RouterModule,
    NgbPaginationModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [
    ListReservationComponent,
    OfferFormComponent,
    CarpoolAccordionComponent,
    CriteriaFormComponent,
    BackBtnComponent,
    ToastGlobalComponent,
    OfferListComponent,
    MenuComponent
  ],
})
export class CollabModule {}
