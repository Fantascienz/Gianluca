import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ListaUtentiService } from '../lista-utenti.service';
import { Utente } from '../models/utente';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-utenti-find',
  templateUrl: './utenti-find.component.html',
  styleUrls: ['./utenti-find.component.css']
})
export class UtentiFindComponent implements OnInit {

  name: string;
  utenti: Utente[];

  constructor(private listaUtenti: ListaUtentiService) { }

  ngOnInit() {
    this.name='';
  }

  onSubmit(){
    this.listaUtenti.cercaUtenti(this.name);
  }


}
