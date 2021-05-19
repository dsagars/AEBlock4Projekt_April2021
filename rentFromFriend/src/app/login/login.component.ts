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
  loginForm : FormGroup;
  signUpForm : FormGroup;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private fb : FormBuilder,
    private customValidator: CustomValidationService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group(
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
    
    this.signUpForm = this.fb.group(
      {
        signupEmailControl : ['',[
          Validators.required,
          Validators.email
        ]],
        signupPasswordControl: ['', [
          Validators.required,
          Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{6,50}$'),
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

  async onPasswordReset(){
    this.router.navigate(['/password-reset']);
  }

  loginIfSuccesful() {
    if (this.firebaseService.isLoggedIn) {
      this.router.navigate(['/base']);
    }
  }
}
