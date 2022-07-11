import { CollabPage } from './pages/collab/collab.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './pages/auth/auth.page';

const routes: Routes = [
  {path: 'auth', component: AuthPage},
  {path: '', pathMatch: 'full', redirectTo: 'auth'},
  {path: 'collaborateur/reservations', component: CollabPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
