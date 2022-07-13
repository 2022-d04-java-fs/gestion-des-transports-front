import { AuthentificationComponent } from './../../auth/components/authentification/authentification.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPage } from './auth.page';
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
