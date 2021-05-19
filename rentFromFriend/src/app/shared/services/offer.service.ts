import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Item } from '../models/item.model';
import { UserService } from './user.service';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemOfferService {
  itemRef: AngularFirestoreCollection<Item>;
  userRef: AngularFirestoreCollection<any>;
  ref: AngularFireStorageReference;
  itemImageUrl;
  task: AngularFireUploadTask;

  constructor(
    private db: AngularFirestore,
    private dbStorage: AngularFireStorage,
    private userService: UserService
  ) {
    this.itemRef = db.collection('/itemsOffer');
    this.userRef = db.collection('/users');
  }

  

  uid = this.userService.getCurrrentUserUID;

  getAll(): AngularFirestoreCollection<Item> {
    return this.itemRef;
  }

  // use this function to create a new offer and add the id to the current user
  create(item: Item) {
    var itemId;
    const uid = this.userService.getCurrrentUserUID();

    this.itemRef
      .add({ ...item, picture: this.itemImageUrl })
      .then((res) => {
        itemId = res.id;
        this.userService.updateOfferItemsInUser(this.uid, res.id);
      })
      .catch((e) => console.error(e));
  }

  update(id: string, data: any): Promise<void> {
    return this.itemRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.itemRef.doc(id).delete();
  }

  uploadImage(file) {
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.dbStorage.ref('offerImages/' + this.uid + randomId);
    this.ref.put(file).then(() => {
      this.ref.getDownloadURL().subscribe((url) => {
        this.itemImageUrl = url;
      });
    });
  }

  getItemImageUrl() {
    return this.itemImageUrl;
  }
}
