import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/shared/services/custom-validation.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';

@Component({
  selector: 'app-user-auth-management',
  templateUrl: './user-auth-management.component.html',
  styleUrls: ['./user-auth-management.component.scss'],
})
export class UserAuthManagementComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<any> = new Subject<any>();

  // Which mode (Confirm Email or Reset Password)
  mode: string;
  actionCode: string;
  actionCodeChecked: boolean;

  // form data from html file
  newPassword: string;
  confirmPassword: string;
  resetPasswForm: FormGroup;

  /* import FirebaseService to be able to use the DB service
     import Router to be able to send User to another page
     import activatedRoute to be able to get the parameters send from Firebase
     import FormBuilder to be able to build for form Validations 
     import customValidator to use to ensure both password and confirm password fields match
     import NotifierService to be able to show Notification to user*/
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: FirebaseService,
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.resetPasswForm = this.fb.group(
      {
        // validate password field has been correctly by the user
        newPasswordControl: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{6,50}$'
            ),
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        /* here we do not need to validate as we have created a custom validator 
           which validates user input already */
        newPasswordAgainControl: [''],
      },
      {
        // use the customer validator created in shared/services/custom-validation to check if passwords match
        validator: this.customValidator.passwordMatchValidator(
          'newPasswordControl',
          'newPasswordAgainControl'
        ),
      }
    );

    /* We want to verify the parameters received by Firebase to decide which logic 
       either confirm email or change password */
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        //we can't do anything if we didn't receive any parameters,
        if (!params) this.router.navigate(['/login']);

        this.mode = params['mode'];
        this.actionCode = params['oobCode'];

        // check which mode (reset password or confirm email)
        switch (params['mode']) {
          // if it is to reset password
          case 'resetPassword':
            {
              // Verify if the password reset code is valid.
              this.authService
                .getAuth()
                .verifyPasswordResetCode(this.actionCode)
                .then((email) => {
                  this.actionCodeChecked = true;
                })
                .catch((e) => {
                  // Invalid or expired action code.
                  this.notifier.showBasic(
                    'Der Link ist nicht mehr gültig! Bitte versuchen sie es erneut.',
                    'Ok'
                  );
                  this.router.navigate(['/password-reset']);
                });
            }
            break;

          // if it is to confirm email
          case 'verifyEmail':
            {
              this.authService
                .getAuth()
                .applyActionCode(this.actionCode)
                .then(() => {
                  this.actionCodeChecked = true;
                })
                .catch((err) => {
                  this.notifier.showBasicAndNavigateToLogin(
                    'Der Link ist nicht mehr gültig! Bitte versuchen sie es erneut.',
                    'Ok'
                  );
                });
            }
            break;
          default: {
            // show message to user to try again
            this.notifier.showBasicAndNavigateToLogin(
              'Der Link ist nicht mehr gültig! Bitte versuchen sie es erneut.',
              'Ok'
            );
          }
        }
      });
  }

  ngOnDestroy() {
    // End all subscriptions listening to ngUnsubscribe to avoid memory leaks.
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // confirm the password reset with firebase and navigate user back to login.
  handleResetPassword() {
    this.authService
      .getAuth()
      .confirmPasswordReset(
        this.actionCode,
        this.resetPasswForm.controls['newPasswordControl'].value
      )
      .then((resp) => {
        // Password reset has been confirmed and new password updated.
        this.notifier.showBasicAndNavigateToLogin(
          'Neues Passwort wurde gespeichert',
          'Ok'
        );
      })
      .catch((e) => {
        // Error occurred during confirmation. The code might have
        // expired or the password is too weak.
        this.notifier.showBasicAndNavigateToLogin(
          'Es hat nicht funktioniert! Passwort link ist abgelaufen',
          'Ok'
        );
      });
  }

  // Send user back to login page
  backToLogin() {
    this.router.navigate(['/login']);
  }
}
