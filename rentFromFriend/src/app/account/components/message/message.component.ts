import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Message } from 'src/app/shared/modles/message.model';
import { User } from 'src/app/shared/modles/user.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  public messages$: Observable<Message[]>;
  text = '';
  public contacts$: Observable<User[]>;
  filteredMessages$: Observable<Message[]>;
  selectedContact$: Observable<User>;
  userId: string;
  constructor(
    private messageService: MessageService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.userService.getCurrrentUserUID();
    this.selectedContact$ = this.messageService.selectedContact$;
    this.messages$ = this.messageService.messages$;
    this.contacts$ = this.messageService.contacts$;

    this.filteredMessages$ = combineLatest([
      this.messages$,
      this.selectedContact$
    ]).pipe(filter(([messages, selectedContact]) => !!selectedContact),
      map(([messages, selectedContact]) => {
        return messages
          .filter(message => (message.recieverId === selectedContact.id || message.senderId === selectedContact.id));
      }
      ));
  }

  send(recieverId: string): void {
    if (!this.text) {
      return;
    }
    this.messageService.sendMessage(this.text, this.userId, recieverId);
    this.text = '';
  }

  setSelectedContact(contact: User): void {
    this.messageService.setSelectedContact(contact);
  }

}
