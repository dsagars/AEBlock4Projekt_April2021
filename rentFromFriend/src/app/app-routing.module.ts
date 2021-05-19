import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailNotVerifiedComponent } from './login/email-not-verified/email-not-verified.component';
import { UserAuthManagementComponent } from './login/forgot-password/user-auth-management/user-auth-management.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsMissingComponent } from './login/user-details-missing/user-details-missing.component';
import { LoginGuard } from './shared/guards/login.guard';
import { RouteGuard } from './shared/guards/route.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'base',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'base',
    loadChildren: () => import('./base/base.module').then((m) => m.BaseModule),
    canActivateChild: [RouteGuard],
  },
  {
    path: 'email-verification',
    component: EmailNotVerifiedComponent,
  },
  {
    path: 'user-details-addon',
    component: UserDetailsMissingComponent,
  },
  {
    path: 'password-reset',
    component: ForgotPasswordComponent,
  },
  {
    path: 'user-auth-management',
    component: UserAuthManagementComponent,
  },
  {
    path: '**',
    redirectTo: 'base',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
