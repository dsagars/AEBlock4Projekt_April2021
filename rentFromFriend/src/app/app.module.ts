import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    SharedModule, 
    // Added forms module for login page
    FormsModule, 
    // Added Firebase Module 
    AngularFireModule.initializeApp(environment.firebase) 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
