import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // email and password for ngModel
  email: string;
  password: string;

  // inject auth to use firebase Auth
  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  // login method which is called inside login form
  login(){

    // for testing
    console.log(this.email);

    // Sign in with Firebase Auth
    this.auth.signInWithEmailAndPassword(this.email, this.password)
    .catch(error => console.log(error.code)
    )
    .then(res => console.log(res));
  }
}
