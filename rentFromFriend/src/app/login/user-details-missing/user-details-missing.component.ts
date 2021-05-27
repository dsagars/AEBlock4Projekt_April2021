import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-user-details-missing',
  templateUrl: './user-details-missing.component.html',
  styleUrls: ['./user-details-missing.component.scss'],
})
export class UserDetailsMissingComponent implements OnInit {
  myFormUserDetailsAddOn: FormGroup;
  isSignedIn: boolean;

  
  /* import FirebaseService to be able to use the DB service
     import Router to be able to send User to another page
     import FormBuilder to be able to build for form Validations */
  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myFormUserDetailsAddOn = this.fb.group({

      // valide first name field in form
      userAddonFirstNameControl: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[a-zA-Z\u00C0-\u00FF]*$'),
          Validators.maxLength(40),
        ],
      ],

      // valide last name field in form
      signupLastNameControl: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[a-zA-Z\u00C0-\u00FF]*$'),
          Validators.maxLength(40),
        ],
      ],

      // validate phone number field in form
      signupPhoneControl: [
        '',
        [Validators.required, Validators.pattern('[0-9]\\d{10,11}')],
      ],
    });
  }

  // use User input data and firebase service to sign up user
  async addUserDetailsAddOn(
    firstName: string,
    lastName: string,
    phone: string
  ) {
    await this.firebaseService.signupUserAddon(firstName, lastName, phone);
    this.loginIfSuccesful();
  }

  // login customer if user passed validation
  loginIfSuccesful() {
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
      this.router.navigate(['/base']);
    }
  }
}