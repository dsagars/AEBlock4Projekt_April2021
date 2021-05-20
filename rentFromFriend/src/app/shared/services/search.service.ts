import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ItemSearchService {
  itemRef: AngularFirestoreCollection<Item>;

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.itemRef = db.collection('/itemsSearch');
  }

  getAll(): AngularFirestoreCollection<Item> {
    return this.itemRef;
  }

  //use this function to create a new offer and add the id to the current user
  create(item: Item) {
    const uid = this.userService.getCurrrentUserUID();

    this.itemRef
      .add({ ...item })
      .then((res) => {
        this.userService.updateSearchItemsInUser(uid, res.id);
      })
      .catch((e) => console.error(e));
  }

  getItemByQueries(): Observable<Item[]> {
    return this.db.collection<Item>('/itemsOffer')
    .valueChanges();
}

  update(id: string, data: any): Promise<void> {
    return this.itemRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.itemRef.doc(id).delete();
  }
}
