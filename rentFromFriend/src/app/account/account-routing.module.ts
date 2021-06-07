import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { MessageComponent } from './components/message/message.component';
import { ManageFriendComponent } from './components/manage-friend/manage-friend.component';
import { AccountComponent } from './account.component';
import { OfferSearchComponent } from './components/offer-search/offer-search.component';

// the routing between the components in the account module

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'message',
        component: MessageComponent
      },
      {
        path: 'manage-friend',
        component: ManageFriendComponent
      },
      {
        path: 'offer-search',
        component: OfferSearchComponent
      }
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
export class AccountRoutingModule { }
