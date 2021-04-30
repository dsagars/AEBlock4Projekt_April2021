import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule,  
  ]
})
export class LoginModule { }

/*ng g module login-routing --flat
for flat file creation*/

// ng g module moduleName  - to create a new module folders