import { MyOfferListModule } from './pages/my-offer-list/my-offer-list.module';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MenuComponent } from './collab/components/menu/menu.component';
import { OfferListComponent } from './collab/components/offer-list/offer-list.component';
import { MyOfferListPage } from './pages/my-offer-list/my-offer-list.page';

@NgModule({
  declarations: [
  AppComponent,
   MenuComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MyOfferListModule

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
