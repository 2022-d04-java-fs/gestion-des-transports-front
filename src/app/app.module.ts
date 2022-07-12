import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollabModule } from './collab/collab.module';
import { OfferModule } from './pages/offer/offer.module';
import { CarpoolReservationModule } from './pages/carpool-reservation/carpool-reservation.module';
import { CarReservationModule } from './pages/car-reservation/car-reservation.module';
import { MenuComponent } from './collab/components/menu/menu.component';
import { MyOfferListModule } from './pages/my-offer-list/my-offer-list.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarReservationModule,
    HttpClientModule,
    NgbModule,
    CarpoolReservationModule,
    CollabModule,
    OfferModule,
    HttpClientModule,
    MyOfferListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
