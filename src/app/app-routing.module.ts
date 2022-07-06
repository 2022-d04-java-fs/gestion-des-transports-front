import { OfferPage } from './pages/offer/offer.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'collaborateur/annonces/creer', component: OfferPage},
  { path: '', pathMatch: 'full', redirectTo: 'collaborateur/annonces/creer' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
