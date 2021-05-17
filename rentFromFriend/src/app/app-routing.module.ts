import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { EmailNotVerifiedComponent } from './login/email-not-verified/email-not-verified.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsMissingComponent } from './login/user-details-missing/user-details-missing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'base',
    component: BaseComponent
  },
  {
    path: 'email-verification',
    component: EmailNotVerifiedComponent
  },
  {
    path: 'user-details-addon',
    component: UserDetailsMissingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
