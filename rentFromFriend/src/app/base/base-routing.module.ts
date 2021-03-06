import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base.component';
import { RouteGuard } from '../shared/guards/route.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { ItemViewComponent } from './components/item-view/item-view.component';

// the routing between the components in the base module

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'search',
        component: SearchComponent,
        data: { searchText: 'searchText', category: 'category', zip: 'zip' }
      },
      {
        path: 'product-details/:id',
        component: ItemViewComponent,
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountModule), // lazyLoad account module 
        canActivateChild: [RouteGuard]
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class BaseRoutingModule { }
