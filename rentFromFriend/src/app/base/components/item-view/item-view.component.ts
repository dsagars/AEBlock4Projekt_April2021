import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Item } from 'src/app/shared/models/item.model';
import { UserAddress } from 'src/app/shared/models/user-address.model';
import { User } from 'src/app/shared/models/user.model';
import { FriendService } from 'src/app/shared/services/friend.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { ItemOfferService } from 'src/app/shared/services/offer.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit, OnDestroy {
  item: Item;
  navigation;
  user$: Observable<User>;
  userAddress: Observable<UserAddress>;
  destroyed$ = new Subject();
  constructor(
    private itemOfferService: ItemOfferService,
    private router: Router,
    private userSerive: UserService,
    private messageService: MessageService,
    private notifier:  NotifierService,
    private friendService: FriendService) {
    this.navigation = this.router.getCurrentNavigation().extras;
  }

  ngOnInit(): void {
    this.item = this.navigation?.state?.data;
    console.log(this.item);
    if (!this.item) {
      return;
    }
    this.user$ = this.userSerive.getUserById(this.item?.uid);
    this.userSerive.getUserAddressByUserId(this.item?.uid).pipe(takeUntil(this.destroyed$))
      .subscribe(address$ => this.userAddress = address$);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  sendMessage(user: User) {
    console.log(user)
    this.messageService.createContact(user).then(() => this.router.navigate(['/base/account/message']));
  }

  addToFriend(user: User) {
    this.friendService.createFriend(user.id).then(()=>{
      this.notifier.showForFiveSeconds('Freund wurde erfolgreich hinzugefügt!', 'Ok');
    }) 
  }
}
