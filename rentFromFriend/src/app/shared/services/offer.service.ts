import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Item } from '../models/item.model';
import { UserService } from './user.service';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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
  itemId: string;
  currentUserOfferIds: string[];
  currentUserItems: Item[];

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

  getAllOfferFromCurrentUser(): Observable<Item[]> {
    return this.db
      .collection<Item>('itemsOffer', (ref) => ref.where('uid', '==', this.uid))
      .valueChanges();
  }

  getAllSearchFromCurrentUser(): Observable<Item[]> {
    return this.db
      .collection<Item>('itemsSearch', (ref) =>
        ref.where('uid', '==', this.uid)
      )
      .valueChanges();
  }

  update(id: string, data: any): Promise<void> {
    return this.itemRef.doc(id).update(data);
  }

  getItemByQueries(params: { searchText: string, category: string, zip: string }): Observable<Item[]> {
    return this.db.collection<Item>('/itemsOffer', ref => ref
      .where('title', '==', params.searchText)
      .where('category', '==', params.category)
      .where('city', '==', params.zip))
      .valueChanges();
  }

  getItemById(itemId: string) {
    return this.db.collection<Item>('/itemsOffer').doc(itemId).valueChanges();
  }

  delete(id: string): Promise<void> {
    return this.itemRef.doc(id).delete();
  }

  uploadOffer(item: Item) {
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
                this.itemRef.doc(res.id).update({ id: res.id });
                this.itemId = res.id;
              })
              .then(() => {
                this.userService.updateOfferItemsInUser(item?.uid, this.itemId);
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
