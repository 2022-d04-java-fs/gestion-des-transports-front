import { OfferModule } from './pages/offer/offer.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollabModule } from './collab/collab.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollabModule,
    OfferModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
