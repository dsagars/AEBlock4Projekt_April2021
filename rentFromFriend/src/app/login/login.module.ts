import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LoginModule { }

/*ng g module login-routing --flat
for flat file creation*/

// ng g module moduleName  - to create a new module folders