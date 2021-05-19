import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private fb : FormBuilder,
    ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group(
      {
        forgotEmailControl : ['',[
          Validators.required,
          Validators.email
        ]]
      }
    );
  }

  async onPasswordReset(email: string){
    await this.firebaseService.resetPassword(email);
    this.router.navigate(['/login']);
  }

}
