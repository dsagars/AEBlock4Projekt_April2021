import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { EmailNotVerifiedComponent } from './email-not-verified/email-not-verified.component';
import { UserDetailsMissingComponent } from './user-details-missing/user-details-missing.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmNewPasswordComponent } from './forgot-password/confirm-new-password/confirm-new-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    EmailNotVerifiedComponent,
    UserDetailsMissingComponent,
    ForgotPasswordComponent,
    ForgotPasswordComponent,
    ConfirmNewPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LoginModule { }
