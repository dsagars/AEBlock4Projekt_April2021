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
      // toDO important maybe check if user already on db?
      this.db.collection('users').doc(res.user.uid).set({
        email: res.user.email,
      });
      // toDo check if user has firstName, lastName etc else send to user details missing...
      localStorage.setItem('user', JSON.stringify(res.user));
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
          user_id: res.user.uid,
          email: res.user.email,
          firstName: firstName,
          lastName: lastName,
          address_id: '',
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
    // Here we should get the user and update fields
    this.db.collection('users').doc(firebase.auth().currentUser.uid).set({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    });
    localStorage.setItem('user', JSON.stringify(firebase.auth().currentUser));
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  public isLoggedIn(): boolean {
    console.log('hoho')
    return !!localStorage.getItem('user');
  }
}
