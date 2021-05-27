import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  // The form group from the html file
  forgotPasswordForm: FormGroup;

  /* import FirebaseService to be able to use the DB service
     import Router to be able to send User to another page
     import FormBuilder to be able to build for form Validations */
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      // Make sure User enters data and verify for email validator
      forgotEmailControl: ['', [Validators.required, Validators.email]],
    });
  }

  // Call the right method from Firebase service and send the user to login
  async onPasswordReset(email: string) {
    await this.firebaseService.resetPassword(email);
    this.router.navigate(['/login']);
  }
}
