import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { EmailNotVerifiedComponent } from './email-not-verified/email-not-verified.component';
import { UserDetailsMissingComponent } from './user-details-missing/user-details-missing.component';

@NgModule({
  declarations: [LoginComponent, EmailNotVerifiedComponent, UserDetailsMissingComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    EmailNotVerifiedComponent,
    UserDetailsMissingComponent
  ]
})
export class LoginModule { }
