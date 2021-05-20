import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { FriendService } from 'src/app/shared/services/friend.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-manage-friend',
  templateUrl: './manage-friend.component.html',
  styleUrls: ['./manage-friend.component.scss']
})
export class ManageFriendComponent implements OnInit {
  friends$: Observable<User[]>;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private friendService: FriendService
  ) {
  }

  ngOnInit(): void {
    this.friends$ = this.friendService.friends$;
  }

  sendMessage(reciever: User): void {
    this.messageService.createContact(reciever).then(value => {
      this.router.navigate(['base/account/message']);
    });
  }

  deleteFriend(friendId: string) {
    this.friendService.deleteFriend(friendId);
    window.location.reload();
  }
}
