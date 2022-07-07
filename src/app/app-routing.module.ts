import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarReservationPage } from './pages/car-reservation/car-reservation.page';

const routes: Routes = [
  { path: 'collaborateur/reservations/creer', component: CarReservationPage },
  {
    path: 'collaborateur/reservations/',
    pathMatch: 'full',
    redirectTo: 'collaborateur/reservations/creer',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'collaborateur/reservations/creer',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
