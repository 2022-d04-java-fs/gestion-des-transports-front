import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OfferListComponent } from './offer-list/offer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponentComponent,
    OfferListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
