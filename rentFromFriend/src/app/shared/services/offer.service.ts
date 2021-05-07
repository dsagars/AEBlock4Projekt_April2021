import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Item } from '../modles/product.model';
import { UserService } from './user.service';
import * as admin from 'firebase-admin';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private dbPath = '/items';
  itemRef: AngularFirestoreCollection<Item>;

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.itemRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Item> {
    return this.itemRef;
  }

  create(item: Item) {
    this.itemRef
      .add({ ...item })
      .then((res) => {
        console.log('aaaaaaaa', res, res.id);
        this.userService.update({
          offers: admin.firestore.FieldValue.arrayUnion('res.id'),
        });
      })
      .catch((e) => console.error(e));
  }

  update(id: string, data: any): Promise<void> {
    return this.itemRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.itemRef.doc(id).delete();
  }
}
