import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Utente } from '../models/utente';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-crea-utente',
  templateUrl: './crea-utente.component.html',
  styleUrls: ['./crea-utente.component.css']
})
export class CreaUtenteComponent implements OnInit {

  titolo = '';
  utente: Utente = new Utente();
  submitted = false;
  subscription: Subscription;
  path = this.route.snapshot.routeConfig.path;

  reactiveForm: FormGroup;

  constructor(private utenteService: UtenteService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    if (this.path === 'info/:id') {
      console.log("INFO")
      this.titolo = 'Info';
      this.subscription = this.route.params.subscribe(
        (params: Params) => {
          this.utenteService.getUtenteById(params['id']).subscribe(
            data => {
              this.reactiveForm = new FormGroup ({
                'name': new FormControl(data.name),
                'surname': new FormControl(data.surname),
                'username': new FormControl(data.username),
                'email': new FormControl(data.email)                
              })
            }
          )
        }
      )
    } else if (this.path === 'crea'){
      console.log("CREA")
      this.titolo = 'Crea';
      this.reactiveForm = new FormGroup ({
        'name': new FormControl(null, Validators.required),
        'surname': new FormControl(null, Validators.required),
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email])
      })
    } else if (this.path === 'modifica/:id'){
      console.log("MODIFICA")
      this.titolo = 'Modifica';
      this.subscription = this.route.params.subscribe(
        (params: Params) => {
          this.utenteService.getUtenteById(params['id']).subscribe(
            data => {
              this.reactiveForm = new FormGroup ({
                'id': new FormControl(data.id, Validators.required),
                'name': new FormControl(data.name, Validators.required),
                'surname': new FormControl(data.surname, Validators.required),
                'username': new FormControl(data.username, Validators.required),
                'email': new FormControl(data.email, [Validators.required, Validators.email])                
              })
            }
          )
        }
      )
    }

    console.log(this.reactiveForm)
  }

  newUtente(): void {
    this.submitted = false;
    this.utente = new Utente();
  }

  crea(utente) {
    this.utenteService.creaUtente(utente)
      .subscribe(data => console.log(data), error => console.log(error));
  }

  modificaUtente(utente){
    console.log(utente)
    this.utenteService.modificaUtente(utente.id,
        {name: utente.name, surname: utente.surname, username: utente.username, email: utente.email})
        .subscribe(
          data => {
            utente = data as Utente;
          },
          error => console.log(error)
        );
  }

  onSubmit() {
    this.submitted = true;
    if (this.path === 'crea'){
      this.crea(this.reactiveForm.value);
    } else if (this.path === 'modifica/:id'){
      this.modificaUtente(this.reactiveForm.value);
    }
    
    this.router.navigate(['utente'])
    console.log(this.reactiveForm)
  }

  tornaSuLista(){
    this.router.navigate(['utente'])
  }

  evento(){
    
  }

}
