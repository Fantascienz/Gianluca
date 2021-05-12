import { Component, Input, OnInit } from '@angular/core';
import { Utente } from '../models/utente';
import { UtenteService } from '../utente.service';
import { UtentiListComponent } from '../utenti-list/utenti-list.component';

@Component({
  selector: 'app-utente-dettagli',
  templateUrl: './utente-dettagli.component.html',
  styleUrls: ['./utente-dettagli.component.css']
})
export class UtenteDettagliComponent implements OnInit {

  @Input() utente: Utente;

  constructor(private utenteService: UtenteService, private utentiLista: UtentiListComponent) { }

  ngOnInit() {
  }

  eliminaUtente(){
    this.utenteService.cancellaUtente(this.utente.id)
      .subscribe(
        data => {
          console.log(data);
          // this.utentiLista.reloadData();
          this.utentiLista.recuperaUtenti(null);
        },
        error => console.log(error)
      );
  }

  modificaUtente(){
    this.utenteService.modificaUtente(this.utente.id,
        {name: this.utente.name, surname: this.utente.surname, username: this.utente.username, email: this.utente.email})
        .subscribe(
          data => {
            console.log(data);
            this.utente = data as Utente;
          },
          error => console.log(error)
        );
  }

}
