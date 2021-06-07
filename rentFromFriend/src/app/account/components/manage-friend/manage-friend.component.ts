import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { FriendService } from 'src/app/shared/services/friend.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-manage-friend',
  templateUrl: './manage-friend.component.html',
  styleUrls: ['./manage-friend.component.scss']
})
export class ManageFriendComponent implements OnInit, OnDestroy {
  friends$: Observable<User[]>;
  destroyed$ = new Subject();

  constructor(
    private messageService: MessageService,
    private router: Router,
    private friendService: FriendService
  ) {
    this.friendService.getFriends().subscribe();
  }

  // getting the friends
  ngOnInit(): void {
    this.friends$ = this.friendService.friends$;
  }

  // complete the subject on destroy
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  // send message to a friend
  sendMessage(reciever: User): void {
    this.messageService.createContact(reciever).then(value => {
      this.router.navigate(['base/account/message']);
    });
  }

  // delete a friend from the friend list
  deleteFriend(friendId: string) {
    this.friendService.deleteFriend(friendId);
  }
}
