import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreaUtenteComponent } from './crea-utente/crea-utente.component';
import { UtenteDettagliComponent } from './utente-dettagli/utente-dettagli.component';
import { UtentiListComponent } from './utenti-list/utenti-list.component';
import { UtentiFindComponent } from './utenti-find/utenti-find.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    CreaUtenteComponent,
    UtenteDettagliComponent,
    UtentiListComponent,
    UtentiFindComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
