import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { User } from '../models/user.model';
import { UserAddress } from '../models/user-address.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userImage: Observable<string>;
  user = this.getCurrentUser();
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  file: File;
  message: Observable<string>;
  imageToPreview: string;
  private userDBPath = 'users';
  userRef: AngularFirestoreCollection<any>;

  private userFromDBSubject$ = new BehaviorSubject<User>(null);
  public userFromDB$ = this.userFromDBSubject$.asObservable();
  get userFromDB(): User {
    return this.userFromDBSubject$.value;
  }
  set userFromDB(userFromDB: User) {
    this.userFromDBSubject$.next(userFromDB);
  }

  private userAddressSubject$ = new BehaviorSubject<UserAddress>(null);
  public userAddress$ = this.userAddressSubject$.asObservable();
  get userAddress(): UserAddress {
    return this.userAddressSubject$.value;
  }
  set userAddress(userAddress: UserAddress) {
    this.userAddressSubject$.next(userAddress);
  }

  constructor(private afStorage: AngularFireStorage, private db: AngularFirestore) {
    this.userRef = db.collection(this.userDBPath);
    this.getUserFromDB().subscribe();
  }

  getUserImage() {
    const ref = this.afStorage.ref('useresImages/' + this.user.uid);
    ref.getDownloadURL().subscribe(result => {
      if (result) {
        this.userImage = ref.getDownloadURL();
      }
    }, error => {
      const defaultImage = this.afStorage.ref('avatar.png');
      this.userImage = defaultImage.getDownloadURL();
    });
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }
    this.file = files[0];
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = of('Only images are supported.');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageToPreview = reader.result.toString();
      this.userImage = of(reader.result.toString());
    };
  }

  uploadImage() {
    const id = this.user.uid;
    this.ref = this.afStorage.ref('useresImages/' + id);
    this.task = this.ref.put(this.file);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.userImage = this.ref.getDownloadURL();
        this.ref.getDownloadURL().subscribe(url => {
          this.userRef.doc(id).update({
            photoUrl: url
          });
        }
        );
      })
    )
      .subscribe();
    this.imageToPreview = null;
  }

  getUserFromDB(): Observable<User> {
    return this.userRef.doc(this.getCurrrentUserUID()).valueChanges().pipe(tap(user => this.userFromDB = user));
  }

  getCurrentUserAddress(addressId: string): Observable<UserAddress> {
    return this.db.collection<UserAddress>('addresses').doc(addressId)
      .valueChanges().pipe(tap(userAddress => this.userAddress = userAddress));
  }

  updateUserData(userData: User, addressData: UserAddress) {
    this.userRef.doc(userData.id).update(userData)
      .then(res => console.log(res)).catch(err => console.log(err));
    this.db.collection<UserAddress>('addresses').doc(userData.addressId).update(addressData)
      .then(res => console.log(res)).catch(err => console.log(err));
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }

  getCurrrentUserUID(): any {
    return this.getCurrentUser().uid;
  }

  getAll(): AngularFirestoreCollection<any> {
    return this.userRef;
  }

  createItem(item: any): any {
    return this.userRef.add({ ...item });
  }

  // update the the doc of the current user
  update(data: User): Promise<void> {
    return this.userRef.doc(this.getCurrrentUserUID()).update(data);
  }

  // add a new itemId from new offers to the array of ItemIds in user doc
  updateOfferItemsInUser(uid, itemId): void {
    this.userRef
      .doc(uid)
      .update({ itemOffers: firebase.firestore.FieldValue.arrayUnion(itemId) });
  }
  // add a new itemId of search to the array of ItemIds in user doc
  updateSearchItemsInUser(uid, itemId): void {
    this.userRef.doc(uid).update({
      itemSearches: firebase.firestore.FieldValue.arrayUnion(itemId),
    });
  }

  delete(id: string): Promise<void> {
    return this.userRef.doc(id).delete();
  }
}
