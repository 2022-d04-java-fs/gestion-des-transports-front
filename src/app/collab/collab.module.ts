import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarpoolAccordionComponent } from './components/carpool-accordion/carpool-accordion.component';
import { CriteriaFormComponent } from './components/criteria-form/criteria-form.component';
import { BackBtnComponent } from './components/back-btn/back-btn.component';
import { ReservationTableComponent } from './components/reservation-table/reservation-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DurationPipe } from './pipes/duration.pipe';

@NgModule({
  declarations: [
    CarpoolAccordionComponent,
    CriteriaFormComponent,
    BackBtnComponent,
    ReservationTableComponent,
    ModalComponent,
    DurationPipe,
  ],
  imports: [CommonModule, RouterModule, NgbModule, ReactiveFormsModule],
  exports: [CarpoolAccordionComponent, CriteriaFormComponent, BackBtnComponent],
})
export class CollabModule {}
