import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { EmailNotVerifiedComponent } from './login/email-not-verified/email-not-verified.component';
import { ConfirmNewPasswordComponent } from './login/forgot-password/confirm-new-password/confirm-new-password.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsMissingComponent } from './login/user-details-missing/user-details-missing.component';
import { LoginGuard } from './shared/guards/login.guard';
import { RouteGuard } from './shared/guards/route.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'base',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    canActivateChild: [RouteGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'base',
    component: BaseComponent,
    canActivate: [RouteGuard]
  },
  {
    path: 'email-verification',
    component: EmailNotVerifiedComponent
  },
  {
    path: 'user-details-addon',
    component: UserDetailsMissingComponent    
  },
  {
    path: 'password-reset',
    component: ForgotPasswordComponent    
  },  
  {
    path: 'confirm-new-password',
    component: ConfirmNewPasswordComponent    
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
