import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPage } from './auth.page';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AuthPage,
    AuthentificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthPage
  ]
})
export class AuthModule { }
