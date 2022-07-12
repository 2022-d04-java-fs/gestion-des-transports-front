
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarReservationPage } from './pages/car-reservation/car-reservation.page';
import { OfferPage } from './pages/offer/offer.page';
import { CarpoolReservationPages } from './pages/carpool-reservation/carpool-reservation.pages';
import { MyOfferListPage } from './pages/my-offer-list/my-offer-list.page';

const routes: Routes = [
  {path:"collaborateur/annonces", component:MyOfferListPage},

  { path: 'collaborateur/reservations/creer', component: CarReservationPage },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'collaborateur/reservations',
  },
  { path: 'collaborateur/reservations', component: CarpoolReservationPages },
  { path: 'collaborateur/annonces/creer', component: OfferPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
