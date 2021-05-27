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
  
  // use of 2 forms on same page with tabs and using angular material tabs
  loginForm : FormGroup;
  signUpForm : FormGroup;

  /* import FirebaseService to be able to use the DB service
     import Router to be able to send User to another page
     import FormBuilder to be able to build for form Validations 
     import customValidator to check for password and confirm password match */
  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private fb : FormBuilder,
    private customValidator: CustomValidationService
  ) {}

  ngOnInit() {
     // get and validate all fields from the login form 
    this.loginForm = this.fb.group(
      {
        // validate email field in form
        loginEmailControl : ['',[
          Validators.required,
          Validators.email
        ]],

        // validate password field in form
        loginPasswordControl: ['', [
          Validators.required,
          Validators.minLength(1),
        ]]
      }
    );
    
    // get and validate all fields from the sign up form 
    this.signUpForm = this.fb.group(
      {
        // validate email field in form
        signupEmailControl : ['',[
          Validators.required,
          Validators.email
        ]],

        // validate password field in form
        signupPasswordControl: ['', [
          Validators.required,
          Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{6,50}$'),
          Validators.minLength(6),
          Validators.maxLength(50)
        ]],     
        
        //  no need to validate confirm password field as we use a custom validator
        signupPasswordAgainControl: [''],

        // validate first name field in form
        signupFirstNameControl: ['', [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[a-zA-Z\u00C0-\u00FF]*$'),
          Validators.maxLength(40)
        ]], 

        // validate last name field in form
        signupLastNameControl: ['', [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[a-zA-Z\u00C0-\u00FF]*$'),
          Validators.maxLength(40)
        ]], 

        // validate phone number field in form
        signupPhoneControl: ['', [
          Validators.required,
          Validators.pattern("[0-9]\\d{10,11}"),
        ]], 
      }, {
        // use the customer validator created in shared/services/custom-validation to check if passwords match
        validator: this.customValidator.passwordMatchValidator("signupPasswordControl", "signupPasswordAgainControl")
      }
    );
  }

  // sign up user in firebase service 
  async onSignup(email: string, password: string, firstName: string, lastName:string, phone: string) {
    await this.firebaseService.signup(email, password, firstName, lastName, phone);
  }

  // sign in user in firebase service
  async onSignin(email: string, password: string) {
    await this.firebaseService.signin(email, password);
    this.loginIfSuccesful();
  }

  // sign in user with google in firebase service
  async onSigninWithGoogle() {
    await this.firebaseService.loginWithGoogle();
    this.loginIfSuccesful();
  }

  // reset the password from user by sending user to password reset page
  async onPasswordReset(){
    this.router.navigate(['/password-reset']);
  }

  // login user if validated (send to base page, which is our home)
  loginIfSuccesful() {
    if (this.firebaseService.isLoggedIn) {
      this.router.navigate(['/base']);
    }
  }
}
