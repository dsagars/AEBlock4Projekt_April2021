import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  public messages$: Observable<Message[]>;
  text = '';
  public contacts$: Observable<User[]>;
  filteredMessages$: Observable<Message[]>;
  selectedContact$: Observable<User>;
  userId: string;
  constructor(
    private messageService: MessageService,
    private userService: UserService) {
    // fetch all messages of user for the first time and fetch sender and reciever information only once
    this.messageService.getMessagesOfUser().pipe(tap(messages => this.messageService.getUserInformationOfMessages(messages)),
      takeUntil(this.destroyed$)).subscribe();
  }

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

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
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
