import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  constructor(public firebaseAuth : AngularFireAuth, private db: AngularFirestore) { }

  async signin(email: string, password : string ){
      await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res=>{
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user))
      })
  }

  async signup(email: string, password : string ){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(res=>{
      console.log(res);
        // this is to get the user id from auth and to set for users inside database
       this.db.collection('users').doc(res.user.uid).set({
          email: res.user.email
       })
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  // new crud testing
  add(){
    this.db.collection('testItems').add({
      timestamp: new Date(),
    });
  }
}
