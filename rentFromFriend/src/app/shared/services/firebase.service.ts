import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public firebaseAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) { }

  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        // navigate to base after logged in
        this.router.navigate(['/base']);
      });
  }

  async signup(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        // this is to get the user id from auth and to set for users inside database
        this.db.collection('users').doc(res.user.uid).set({
          email: res.user.email
        });
      });
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  // new crud testing
  add() {
    this.db.collection('testItems').add({
      timestamp: new Date(),
    });
  }
}
