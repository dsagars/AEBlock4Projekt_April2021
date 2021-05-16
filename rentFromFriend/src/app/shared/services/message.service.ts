import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Message } from '../modles/message.model';
import { User } from '../modles/user.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // created a subject and observable to fetch messages of user
  private messagesSubject$ = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject$.asObservable().pipe(map(messages =>
    messages.sort((messageA, messageB) =>
      new Date(messageA.date).getTime() - new Date(messageB.date).getTime())));


  // to get the current value of the subject
  get messages(): Message[] {
    return this.messagesSubject$.value;
  }
  // to set the new messages to subject
  set messages(messages: Message[]) {
    this.messagesSubject$.next(messages);
  }

  // related contacts of messages
  private contactsSubject$ = new BehaviorSubject<User[]>([]);
  public contacts$ = this.contactsSubject$.asObservable().pipe(map(contacts => contacts
    .filter(contact => contact.id !== '7kw4jZTmGrTF39ISRt52paSiSpL2'))
  );
  // get the current value of contacts
  get contacts(): User[] {
    return this.contactsSubject$.value;
  }
  // to set the new contacts
  set contacts(contacts: User[]) {
    this.contactsSubject$.next(contacts);
  }

  // created a subject and observable to set the selected contact
  private selectedContactSubject$ = new BehaviorSubject<User>(null);
  public selectedContact$ = this.selectedContactSubject$.asObservable()
  // get the current value of selected contact
  get selectedContact(): User {
    return this.selectedContactSubject$.value;
  }
  // to set the new selectedContact
  set selectedContact(selectedContact: User) {
    this.selectedContactSubject$.next(selectedContact);
  }
  // a temporary array to save the contact id in
  tempList = [];


  constructor(
    private db: AngularFirestore,
  ) {
    // fetch all messages of user for the first time and fetch sender and reciever information only once
    this.getMessagesOfUser().pipe(tap(messages => this.getUserInformationOfMessages(messages))).subscribe();
  }
  // this function will return an Observable<Message[]> with all messages of user
  getMessagesOfUser(): Observable<any> {
    return this.db.collection('users')
      .doc('7kw4jZTmGrTF39ISRt52paSiSpL2')
      .collection('messages').valueChanges().pipe(tap(messages => this.messages = messages));
  }

  // this function will fetch the information of reciever and sender of the each message
  getUserInformationOfMessages(messages: Message[]): void {
    messages.forEach((message: Message) => {
      this.getUserInformationById(message.recieverId);
      this.getUserInformationById(message.senderId);
    });
  }
  // this function will return user information
  getUserInformationById(id: string): void {
    // if the id is not in the tempList
    if (!this.tempList.includes(id)) {
      // add the id to the list
      this.tempList.push(id);

      // if any changes happend we replace the new user with the old one and the other users stay untouched
      this.db.collection<User>('users').doc(id).valueChanges().pipe(tap((user: User) => {
        // if user have no id should return
        if (!user.id) {
          return;
        }
        this.contacts = this.contacts.map(contact => contact.id === user.id ? user : contact);
      })).subscribe();

      // if the user doesn't exists in the contact array we push it to the array
      this.db.collection<User>('users').doc(id).valueChanges().pipe(take(1), tap((user: User) =>
        this.contacts = [...this.contacts, user]
      )).subscribe();
    }

  }
  // send message functionality
  sendMessage(text: string, senderId: string, recieverId: string): void {
    // store the message in an object
    const message = {
      senderId,
      recieverId,
      text,
      date: new Date().toISOString()
    };
    // add the message to the sender and the reciever
    this.db.collection<User>('users').doc(senderId).collection('messages').add(message);
    this.db.collection<User>('users').doc(recieverId).collection('messages').add(message);
  }

  // set the selected contact
  setSelectedContact(contact: User): void {
    this.selectedContact = contact;
  }
}