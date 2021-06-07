import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private friendsIdSubject$ = new BehaviorSubject<{ id: string, friendId: string }[]>([]);
  public friendsId$ = this.friendsIdSubject$.asObservable()
  get friendsId(): { id: string, friendId: string }[] {
    return this.friendsIdSubject$.value;
  }
  set friendsId(friends: { id: string, friendId: string }[]) {
    this.friendsIdSubject$.next(friends);
  }

  private friendsSubject$ = new BehaviorSubject<User[]>([]);
  public friends$ = this.friendsSubject$.asObservable()
  get friends(): User[] {
    return this.friendsSubject$.value;
  }
  set friends(friends: User[]) {
    this.friendsSubject$.next(friends);
  }

  tempList = [];

  constructor(
    private db: AngularFirestore,
    private userService: UserService
  ) {
  }
  // getFriends from DB
  getFriends(): Observable<{ id: string, friendId: string }[]> {
    return this.db.collection<User>('users').doc(this.userService.getCurrrentUserUID())
      .collection<{ id: string, friendId: string }>('friends').valueChanges().pipe(take(1), tap(friends => {
        this.friendsId = friends;
        this.getFriendsById(friends);
      }));
  }

  // Create Friend to both User
  createFriend(friendId: string): Promise<any> {
    if (this.friends.find(friend => friend.id === friendId)) {
      return of(true).toPromise();
    }
    return Promise.all([
      this.db.collection<User>('users').doc(this.userService.getCurrrentUserUID()).collection<{ id: string, friendId: string }>('friends').add({
        friendId,
        id: ''
      }),
      this.db.collection<User>('users').doc(friendId).collection<{ id: string, friendId: string }>('friends').add(
        {
          friendId: this.userService.getCurrrentUserUID(),
          id: ''
        })
    ]).then(value => {
      this.db.collection<User>('users').doc(this.userService.getCurrrentUserUID()).collection<{ id: string }>('friends').doc(value[0].id).update({
        id: value[0].id,
      })
      this.db.collection<User>('users').doc(friendId).collection<{ id: string }>('friends').doc(value[1].id).update({
        id: value[1].id,
      })
    })
  }

  getFriendsById(friends: { friendId: string }[]) {
    friends.forEach(friend => {
      this.getUserInformationById(friend.friendId);
    });
  }

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
        this.friends = this.friends.map(friend => friend.id === user.id ? user : friend);
      })).subscribe();

      // if the user doesn't exists in the contact array we push it to the array
      this.db.collection<User>('users').doc(id).valueChanges().pipe(take(1), tap((user: User) =>
        this.friends = [...this.friends, user]
      )).subscribe();
    }

  }

  // deleteFriend from DB
  deleteFriend(friendId: string) {
    const fId = this.friendsId.find(friend => friend.friendId === friendId);
    this.db.collection<User>('users').doc(this.userService.getCurrrentUserUID())
      .collection<{ friendId: string }>('friends').doc(fId.id).delete().then(() => {
        this.friends = this.friends.filter(friend => friend.id !== friendId);
        this.tempList = this.tempList.filter(id => id !== friendId);
      });
  }
}
