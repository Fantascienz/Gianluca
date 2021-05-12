import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreaUtenteComponent } from "./crea-utente/crea-utente.component";
import { UtentiFindComponent } from "./utenti-find/utenti-find.component";
import { UtentiListComponent } from "./utenti-list/utenti-list.component";

const id = '';

const routes: Routes = [
    {path: '', redirectTo: 'utente', pathMatch: 'full'},
    {path: 'utente', component: UtentiListComponent},
    {path: 'crea', component: CreaUtenteComponent},
    {path: 'info/:id', component: CreaUtenteComponent},
    {path: 'modifica/:id', component: CreaUtenteComponent},
    {path: 'cerca', component: UtentiFindComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
