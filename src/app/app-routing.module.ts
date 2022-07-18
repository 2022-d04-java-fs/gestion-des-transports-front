import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './pages/auth/auth.page';
import { CarReservationPage } from './pages/car-reservation/car-reservation.page';
import { OfferPage } from './pages/offer/offer.page';
import { CarpoolReservationPages } from './pages/carpool-reservation/carpool-reservation.pages';
import { MyOfferListPage } from './pages/my-offer-list/my-offer-list.page';

const routes: Routes = [
  {path: 'auth', component: AuthPage},
  {path:"collaborateur/annonces", component:MyOfferListPage, canActivate:[AuthGuard]},
  { path: 'collaborateur/reservations/creer', component: CarReservationPage, canActivate:[AuthGuard] },
  { path: 'collaborateur/reservations', component: CarpoolReservationPages, canActivate:[AuthGuard] },
  { path: 'collaborateur/annonces/creer', component: OfferPage, canActivate:[AuthGuard] },
  {path: '', pathMatch: 'full', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
