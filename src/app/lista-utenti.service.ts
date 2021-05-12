import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Utente } from './models/utente';
import { UtenteService } from './utente.service';

@Injectable({
  providedIn: 'root'
})
export class ListaUtentiService {

  utenti: Utente[] = [];
  page=1;
  pageSize=3;
  updateList = new Subject<{lista: Utente[], params: {page: number, pageSize: number}}>();

  constructor(private utenteService: UtenteService) { }

  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};

    if (page) {
      params[`page`] = page-1;
    }

    if (pageSize) {
      params[`size`] =pageSize;
    }

    return params;
  }

  ngOnInit(){
    const params = this.getRequestParams(this.page, this.pageSize);

    this.utenteService.getUtentiPages(params).subscribe( 
      
      data => {
        console.log("!!!!!"+data),
        this.utenti=data
      }
    );
  }

  cercaUtenti(name){
    this.utenteService.getUtentiByNome(name)
      .subscribe(
        utenti => {
          this.utenti = utenti;
          this.updateList.next({lista: this.utenti, params: {page:this.page, pageSize:this.pageSize}})
        });
  }
}
