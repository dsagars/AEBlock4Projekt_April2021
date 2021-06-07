import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountRoutingModule } from './account-routing.module';
import { MessageComponent } from './components/message/message.component';
import { ManageFriendComponent } from './components/manage-friend/manage-friend.component';
import { AccountComponent } from './account.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { OfferSearchComponent } from './components/offer-search/offer-search.component';

// account module to declare and import relative components and libraries for this module

@NgModule({
  declarations: [
    ProfileComponent,
    MessageComponent,
    ManageFriendComponent,
    AccountComponent,
    OfferSearchComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatSidenavModule,
    SharedModule
  ]
})
export class AccountModule { }
