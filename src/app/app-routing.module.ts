import { CollabModule } from './pages/collab/collab.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollabPage } from './pages/collab/collab.page';

const routes: Routes = [
  { path: 'collaborateur/reservations', component: CollabPage },
  { path: '', pathMatch: 'full', redirectTo: 'collaborateur/reservations' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
