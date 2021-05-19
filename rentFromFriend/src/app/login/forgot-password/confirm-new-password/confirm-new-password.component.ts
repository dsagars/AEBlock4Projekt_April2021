import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/shared/services/custom-validation.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';

@Component({
  selector: 'app-confirm-new-password',
  templateUrl: './confirm-new-password.component.html',
  styleUrls: ['./confirm-new-password.component.scss'],
})
export class ConfirmNewPasswordComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<any> = new Subject<any>();

  // Just a code Firebase uses to check that this is a real password reset.
  actionCode: string;

  newPassword: string;
  confirmPassword: string;
  actionCodeChecked: boolean;
  resetPasswForm: FormGroup;

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

    this.activatedRoute.queryParams
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        //We can't do anything if we didn't receive any parameters
        if (!params) {
          console.log('params in ngOnInit');
          this.router.navigate(['/login']);
        }
        this.actionCode = params['oobCode'];

        // Verify the password reset code is valid.
        this.authService
          .getAuth()
          .verifyPasswordResetCode(this.actionCode)
          .then((email) => {
            this.actionCodeChecked = true;
          })
          .catch((e) => {
            // Invalid or expired action code. Ask user to try to
            // reset the password again.
            alert(e);
            this.router.navigate(['/password-reset']);
          });
      });
  }

  ngOnDestroy() {
    // End all subscriptions listening to ngUnsubscribe to avoid memory leaks.
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // Attempt to confirm the password reset with firebase and navigate user back to login.
  handleResetPassword() {
    // Save the new password.
    this.authService
      .getAuth()
      .confirmPasswordReset(
        this.actionCode,
        this.resetPasswForm.controls['newPasswordControl'].value
      )
      .then((resp) => {
        this.notifier.showBasicAndNavigateToLogin('Neues Passwort wurde gespeichert','Ok');
      })
      .catch((e) => {
        this.notifier.showBasicAndNavigateToLogin('Etwas hat nicht funktioniert.Bitte versuchen sie es später noch mal!','Ok');
        console.log(e);
      });
  }
}
