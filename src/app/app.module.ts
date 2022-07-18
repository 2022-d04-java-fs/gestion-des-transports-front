import { CollabModule } from 'src/app/collab/collab.module';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './pages/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { OfferModule } from './pages/offer/offer.module';
import { CarpoolReservationModule } from './pages/carpool-reservation/carpool-reservation.module';
import { CarReservationModule } from './pages/car-reservation/car-reservation.module';
import { MyOfferListModule } from './pages/my-offer-list/my-offer-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AuthModule,
    HttpClientModule,
    CarReservationModule,
    CarpoolReservationModule,
    CollabModule,
    OfferModule,
    MyOfferListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
