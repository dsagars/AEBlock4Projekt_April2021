import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSignedIn = false;
  constructor(public firebaseService : FirebaseService){}
  ngOnInit(){
    if(localStorage.getItem('user') !== null){
      // set true if you want to save in browser. The user will be logged in automatically
      // (if you do not see the signup/login form, set to false!)
      this.isSignedIn = false;
    } else {
      this.isSignedIn = false;
    }
  }

  async onSignup(email: string, password: string){
    await this.firebaseService.signup(email, password);
    if(this.firebaseService.isLoggedIn){
      this.isSignedIn = true;
    }
  }

  async onSignin(email: string, password: string){
    await this.firebaseService.signin(email, password);
    if(this.firebaseService.isLoggedIn){
      this.isSignedIn = true;
    }
  }

  handleLogout(){
    this.isSignedIn = false;
  }

  // new testing for crud
  async add(){
    await this.firebaseService.add();
  }

}
