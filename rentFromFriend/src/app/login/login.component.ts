import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from '../shared/services/custom-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSignedIn = false;
  myFormLogin : FormGroup;
  myFormSingUp : FormGroup;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private fb : FormBuilder,
    private customValidator: CustomValidationService
  ) {}

  ngOnInit() {
    this.myFormLogin = this.fb.group(
      {
        loginEmailControl : ['',[
          Validators.required,
          Validators.email
        ]],
        loginPasswordControl: ['', [
          Validators.required,
          Validators.minLength(1),
        ]]
      }
    );
    
    this.myFormSingUp = this.fb.group(
      {
        signupEmailControl : ['',[
          Validators.required,
          Validators.email
        ]],
        signupPasswordControl: ['', [
          Validators.required,
          Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{6,12}$'),
          Validators.minLength(6),
          Validators.maxLength(50)
        ]],        
        signupPasswordAgainControl: [''],
        signupFirstNameControl: ['', [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[a-zA-Z\u00C0-\u00FF]*$'),
          Validators.maxLength(40)
        ]], 
        signupLastNameControl: ['', [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[a-zA-Z\u00C0-\u00FF]*$'),
          Validators.maxLength(40)
        ]], 
        signupPhoneControl: ['', [
          Validators.required,
          Validators.pattern("[0-9]\\d{10,11}"),
        ]], 
      }, {
        // use the customer validator created in shared/services/custom-validation to check if passwords match
        validator: this.customValidator.passwordMatchValidator("signupPasswordControl", "signupPasswordAgainControl")
      }
    );

    if (localStorage.getItem('user') !== null) {
      // set true if you want to save in browser. The user will be logged in automatically
      // (if you do not see the signup/login form, set to false!)
      this.isSignedIn = false;
    } else {
      this.isSignedIn = false;
    }
  }

  async onSignup(email: string, password: string, firstName: string, lastName:string, phone: string) {
    await this.firebaseService.signup(email, password, firstName, lastName, phone);
    this.loginIfSuccesful();
  }

  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email, password);
    this.loginIfSuccesful();
  }

  async onSigninWithGoogle(email: string, password: string) {
    await this.firebaseService.loginWithGoogle();
    this.loginIfSuccesful();
  }

  loginIfSuccesful() {
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
      this.router.navigate(['/base']);
    }
  }
}
