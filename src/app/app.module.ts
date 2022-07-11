import { CarpoolReservationModule } from './pages/carpool-reservation/carpool-reservation.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CarpoolReservationPages } from './pages/carpool-reservation/carpool-reservation.pages';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CarpoolReservationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
