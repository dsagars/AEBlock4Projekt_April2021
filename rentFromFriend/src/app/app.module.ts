import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { BaseModule } from './base/base.module';
import { EmailNotVerifiedComponent } from './login/email-not-verified/email-not-verified.component';
import { UserDetailsMissingComponent } from './login/user-details-missing/user-details-missing.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ConfirmNewPasswordComponent } from './login/forgot-password/confirm-new-password/confirm-new-password.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, EmailNotVerifiedComponent, UserDetailsMissingComponent, ForgotPasswordComponent, ConfirmNewPasswordComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    SharedModule,
    BaseModule,
    // Added Firebase Module 
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
