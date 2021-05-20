import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BaseComponent } from './base.component';
import { BaseRoutingModule } from './base-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    BaseComponent,
    DashboardComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BaseRoutingModule
  ],
  exports: [BaseComponent],
})
export class BaseModule { }
