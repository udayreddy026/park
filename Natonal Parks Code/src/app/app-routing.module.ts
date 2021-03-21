import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { KazirangaComponent } from './kaziranga/kaziranga.component';
import { CorbettComponent } from './corbett/corbett.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path : '' , component : HomeComponent},
  { path : 'login' , component : LoginComponent},
  { path : 'list' , component : ListComponent},
  { path : 'kaziranga' , component : KazirangaComponent},
  { path : 'corbett' , component : CorbettComponent },
  { path : 'gmap' , component : GoogleMapComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
