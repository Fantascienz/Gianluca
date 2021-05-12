import { Component, OnInit } from '@angular/core';
import { Utente } from '../models/utente';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-utenti-list',
  templateUrl: './utenti-list.component.html',
  styleUrls: ['./utenti-list.component.css']
})
export class UtentiListComponent implements OnInit {

  utenti: Utente[] = [];
  currentIndex= -1;
  page=1;
  count=0;
  pageSize=3;
  pageSizes=[3, 5, 10];

  nameToSearch='';
  paramToSort='';

  constructor(private utenteService: UtenteService) {}

  ngOnInit(): void {
    this.recuperaUtenti(null);
  }

  getRequestParams(sorting: string, cercaNome: string, page: number, pageSize: number): any {
    let params: any = {};

    if(sorting){
      params['sort'] = sorting;
    } 

    if(cercaNome){
      params['nome'] = cercaNome;
    }

    if (page) {
      params[`page`] = page-1;
    }

    if (pageSize) {
      params[`size`] =pageSize;
    }

    return params;
  }


  recuperaUtenti(e: string): void {

    this.paramToSort = e;

    const params = this.getRequestParams(this.paramToSort, this.nameToSearch, this.page, this.pageSize);

    console.log(params)

    this.utenteService.getUtentiByNome(params)
      .subscribe(
        response => {
          const {utenti, totalItems } = response;
          this.utenti = utenti;
          this.count = totalItems;
          console.log("RESPONSE", response);
        },
        error => {
          console.log(error);
        }
      );
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.recuperaUtenti(null);
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.recuperaUtenti(null);
  }

  eliminaUtente(utente){
    this.utenteService.cancellaUtente(utente.id)
      .subscribe(
        data => {
          console.log(data);
          this.recuperaUtenti(null);
        },
        error => console.log(error)
      );
  }

  modificaUtente(utente){
    this.utenteService.modificaUtente(utente.id,
        {name: utente.name, surname: utente.surname, username: utente.username, email: utente.email})
        .subscribe(
          data => {
            console.log(data);
            utente = data as Utente;
          },
          error => console.log(error)
        );
  }

  infoUtente(utente){
    console.log(utente)
  }
}
