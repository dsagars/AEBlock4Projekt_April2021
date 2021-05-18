import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';
import { MessageService } from 'src/app/shared/services/message.service';

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
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
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

  send(): void {
    if (!this.text) {
      return;
    }
    this.messageService.sendMessage(this.text, '7kw4jZTmGrTF39ISRt52paSiSpL2', 'DUJS3t8y9Za48D2Qd1bwqGIDtWK2');
    this.text = '';
  }

  setSelectedContact(contact: User): void {
    this.messageService.setSelectedContact(contact);
  }

}
