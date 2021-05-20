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
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemOfferService {
  itemRef: AngularFirestoreCollection<Item>;
  userRef: AngularFirestoreCollection<any>;
  ref: AngularFireStorageReference;
  itemImageUrl;
  task: AngularFireUploadTask;
  file: File;
  uid;

  constructor(
    private db: AngularFirestore,
    private dbStorage: AngularFireStorage,
    private userService: UserService
  ) {
    this.itemRef = db.collection<Item>('/itemsOffer');
    this.userRef = db.collection('/users');
    this.uid = this.userService.getCurrrentUserUID();
  }

  getAll(): AngularFirestoreCollection<Item> {
    return this.itemRef;
  }

  // use this function to create a new offer and add the id to the current user
  create(item: Item) {
    this.uploadImage(item);
  }

  update(id: string, data: any): Promise<void> {
    return this.itemRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.itemRef.doc(id).delete();
  }

  uploadImage(item: Item) {
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.dbStorage.ref('offerImages/' + this.uid + randomId);
    if (!this.file) console.error('File not set');
    this.task = this.ref.put(this.file);
    return this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe((res) => {
            this.itemImageUrl = res;
            this.itemRef
              .add({ ...item, picture: this.itemImageUrl })
              .then((res) => {
                this.userService.updateOfferItemsInUser(item?.uid, res.id);
              })
              .catch((e) => console.error(e));
          });
        })
      )
      .subscribe();
  }

  getItemImageUrl() {
    return this.itemImageUrl;
  }
}
