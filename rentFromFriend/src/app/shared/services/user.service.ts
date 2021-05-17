import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbPath = 'users';
  userRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.userRef = db.collection(this.dbPath);
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserUID(): any {
    return this.getUser().uid;
  }

  getAll(): AngularFirestoreCollection<any> {
    return this.userRef;
  }

  create(item: any): any {
    return this.userRef.add({ ...item });
  }

  //update the the doc of the current user
  update(data: any): Promise<void> {
    return this.userRef.doc(this.getUserUID()).update(data);
  }

  //add a new itemId to the array of ItemIds in user doc
  updateItemsInUser(uid, itemId) {
    this.userRef
      .doc(uid)
      .update({ items: firebase.firestore.FieldValue.arrayUnion(itemId) });
  }

  delete(id: string): Promise<void> {
    return this.userRef.doc(id).delete();
  }
}
