import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BaseComponent } from './base.component';
import { BaseRoutingModule } from './base-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { ItemViewComponent } from './components/item-view/item-view.component';

// base module to declare and import relative components and libraries for this module
@NgModule({
  declarations: [
    BaseComponent,
    DashboardComponent,
    SearchComponent,
    ItemViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BaseRoutingModule
  ],
  exports: [BaseComponent],
})
export class BaseModule { }
