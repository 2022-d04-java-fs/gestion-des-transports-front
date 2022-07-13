import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './pages/auth/auth.page';
import { CarReservationPage } from './pages/car-reservation/car-reservation.page';
import { OfferPage } from './pages/offer/offer.page';
import { CarpoolReservationPages } from './pages/carpool-reservation/carpool-reservation.pages';
import { MyOfferListPage } from './pages/my-offer-list/my-offer-list.page';

const routes: Routes = [
  {path: 'auth', component: AuthPage},
  {path:"collaborateur/annonces", component:MyOfferListPage},
  { path: 'collaborateur/reservations/creer', component: CarReservationPage },
  { path: 'collaborateur/reservations', component: CarpoolReservationPages },
  { path: 'collaborateur/annonces/creer', component: OfferPage },
  {path: '', pathMatch: 'full', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
