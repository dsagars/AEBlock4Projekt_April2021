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

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myFormUserDetailsAddOn = this.fb.group({
      userAddonFirstNameControl: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[a-zA-Z\u00C0-\u00FF]*$'),
          Validators.maxLength(40),
        ],
      ],
      signupLastNameControl: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[a-zA-Z\u00C0-\u00FF]*$'),
          Validators.maxLength(40),
        ],
      ],
      signupPhoneControl: [
        '',
        [Validators.required, Validators.pattern('[0-9]\\d{10,11}')],
      ],
    });
  }

  async addUserDetailsAddOn(
    firstName: string,
    lastName: string,
    phone: string
  ) {
    await this.firebaseService.signupUserAddon(firstName, lastName, phone);
    this.loginIfSuccesful();
  }

  loginIfSuccesful() {
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
      this.router.navigate(['/base']);
    }
  }
}