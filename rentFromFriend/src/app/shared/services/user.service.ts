import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbPath = '/user';
  userRef: AngularFirestoreCollection<any>;

  constructor(
    private db: AngularFirestore,
    private localStorageService: LocalStorageService
  ) {
    this.userRef = db.collection(this.dbPath);
  }

  private uid = this.localStorageService.getUserUID();

  getAll(): AngularFirestoreCollection<any> {
    return this.userRef;
  }

  create(item: any): any {
    return this.userRef.add({ ...item });
  }

  update(data: any, uid?: string): Promise<void> {
    if (!uid) uid = this.uid;
    console.log('user - uid', uid);
    return this.userRef.doc(uid).update(data);
  }

  delete(id: string): Promise<void> {
    return this.userRef.doc(id).delete();
  }
}
