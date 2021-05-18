import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    public firebaseAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) { }

  async signin(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        var isUserVerified = res.user.emailVerified;
        if (isUserVerified) {
          localStorage.setItem('user', JSON.stringify(res.user));
        } else {
          this.router.navigate(['/email-verification']);
        }
      });
  }

  async loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    await this.firebaseAuth.signInWithPopup(provider).then((res) => {
      
      // Check if user already in db
      const usersRef = this.db.collection('users').doc(res.user.uid);
      usersRef.get().subscribe((docSnapshot) => {

        // Does user exist already?
        if (docSnapshot.exists) {
          // check if user has firstName, lastName etc else send to user details missing page...
          if (
            docSnapshot.data()['firstName'] === undefined ||
            docSnapshot.data()['lastName'] === undefined ||
            docSnapshot.data()['phone'] === undefined
          ) {
            this.router.navigate(['/user-details-addon']);
          } else {
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['/base']);   
          }
        } else {
          // create the user document
          usersRef.set({
            email: res.user.email,
            addressId: '',
            id: res.user.uid,
          });
          this.router.navigate(['/user-details-addon']);
        }
      });
    });
  }

  async signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user.sendEmailVerification();
        // this is to get the user id from auth and to set for users inside database
        this.db.collection('users').doc(res.user.uid).set({
          id: res.user.uid,
          email: res.user.email,
          firstName: firstName,
          lastName: lastName,
          addressId: '',
          phone: phone,
        });
        // log in only if user has verified email else notify user
        if (res.user.emailVerified) {
          localStorage.setItem('user', JSON.stringify(res.user));
        } else {
          this.router.navigate(['/email-verification']);
        }
      });
  }

  async signupUserAddon(firstName: string, lastName: string, phone: string) {
    // Here we get the user and update fields
    this.db.collection('users').doc(firebase.auth().currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    });
    localStorage.setItem('user', JSON.stringify(firebase.auth().currentUser));
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    console.log('hoho');
    return !!localStorage.getItem('user');
  }
}
