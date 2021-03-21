import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerService } from './shared/customer.service';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ListComponent } from './list/list.component';
import { KazirangaComponent } from './kaziranga/kaziranga.component';
import { HttpClientModule } from '@angular/common/http';
import { CorbettComponent } from './corbett/corbett.component';
import { ImageUploadModule } from 'ng2-imageupload';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapComponent } from './google-map/google-map.component';
import 'firebase/database'; 
import 'firebase/storage';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ListComponent,
    KazirangaComponent,
    CorbettComponent,
    GoogleMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    Ng2ImgMaxModule,
    ImageUploadModule,
    AgmCoreModule.forRoot({
      apiKey : environment.googleMapsApi
    })
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }