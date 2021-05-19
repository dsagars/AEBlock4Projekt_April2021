import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Item } from '../models/item.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ItemOfferService {
  itemRef: AngularFirestoreCollection<Item>;

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.itemRef = db.collection('/itemsOffer');
  }

  getAll(): AngularFirestoreCollection<Item> {
    return this.itemRef; 
  }

  // use this function to create a new offer and add the id to the current user
  create(item: Item) {
    const uid = this.userService.getCurrrentUserUID();

    this.itemRef
      .add({ ...item })
      .then((res) => {
        console.log(uid, res.id);
        this.userService.updateOfferItemsInUser(uid, res.id);
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
