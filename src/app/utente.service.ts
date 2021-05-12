import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private URL = "http://localhost:8080/rest"

  constructor(private http: HttpClient) { }

	// GET ALL - Paginazione--------------------------
  getUtentiPages(params: any): Observable<any>{
    return this.http.get<any>(`${this.URL}/utenti/page`, { params })
  }

  //GET ALL----------------------------------------
  getUtentiList(): Observable<any> {
    return this.http.get(`${this.URL}/utenti`);
  }

  //CREATE-----------------------------------------
  creaUtente(utente: Object): Observable<Object> {
    return this.http.post(`${this.URL}/utente/crea`, utente);
  }

	//DELETE-----------------------------------------
  cancellaUtente(id: string): Observable<any>{
    return this.http.delete(`${this.URL}/elimina/${id}`, {responseType:'text'});
  }

  //GET ALL By NAME--------------------------------
  getUtentiByNome(params: any): Observable<any>{
    console.log("Parametri in Chiamata", params)
    return this.http.get<any>(`${this.URL}/utentiByName`, {params})
  }

  ///GET UTENTE BY ID
  getUtenteById(id: string): Observable<any>{
    return this.http.get(`${this.URL}/utente/${id}`)
  }

	//UPDATE-----------------------------------------
  modificaUtente(id:string, value: any): Observable<any>{
    return this.http.put(`${this.URL}/modifica/${id}`, value);
  }
}
