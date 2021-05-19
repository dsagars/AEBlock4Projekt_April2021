import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { User } from '../modles/user.model';
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
  constructor(
    private db: AngularFirestore,
    private userService: UserService
  ) {
    this.getFriends().subscribe();
  }

  getFriends(): Observable<{ id: string, friendId: string }[]> {
    return this.db.collection<User>('users').doc(this.userService.getCurrrentUserUID())
      .collection<{ id: string, friendId: string }>('friends').valueChanges().pipe(take(1), tap(friends => {
        this.friendsId = friends;
        this.getFriendsById(friends);
      }));
  }

  getFriendsById(friends: { friendId: string }[]) {
    friends.forEach(friend => {
      // console.log(friend);
      this.getUserInformationById(friend.friendId);
    });
  }

  getUserInformationById(id: string): void {
    this.db.collection<User>('users').doc(id).valueChanges().pipe(take(1)).subscribe(user => {
      console.log(user);
      this.friends = [
        ...this.friends,
        user
      ];
    });
  }

  deleteFriend(friendId: string) {
    const findFriend = this.friendsId.find(friend => friend.friendId === friendId);
    this.db.collection<User>('users').doc(this.userService.getCurrrentUserUID())
      .collection<{ friendId: string }>('friends').doc(findFriend.id).delete();
  }
}
