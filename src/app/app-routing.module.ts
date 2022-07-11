import { MyOfferListPage } from './pages/my-offer-list/my-offer-list.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"collaborateur/annonces", component:MyOfferListPage},
  {path:"",pathMatch:"full", redirectTo:"collaborateur/annonces"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
