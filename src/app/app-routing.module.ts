import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarpoolReservationPages } from './pages/carpool-reservation/carpool-reservation.pages';

const routes: Routes = [
  { path: 'collaborateur/reservations', component: CarpoolReservationPages },
  { path: 'collaborateur/propositions/creer', redirectTo: 'collaborateur/reservations' },
  { path: '', pathMatch: 'full', redirectTo: 'collaborateur/reservations' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
