import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { UserAddress } from 'src/app/shared/models/user-address.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  user: User;
  userAddress: UserAddress;
  userInfoForm: FormGroup;
  userAddressForm: FormGroup;
  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userService.getUserFromDB().pipe(takeUntil(this.destroyed$)).subscribe();
  }

  ngOnInit(): void {
    this.userService.userFromDB$.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      this.user = user;
      this.initUserInfoForm();
      this.inituserAddressForm();
      if (this.user?.addressId) {
        this.userService.getCurrentUserAddress(this.user?.addressId).pipe(take(1), takeUntil(this.destroyed$)).subscribe(userAddress => {
          this.userAddress = userAddress;
          this.inituserAddressForm();
        });
      }
    });
    this.userService.getUserImage();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  initUserInfoForm(): void {
    this.userInfoForm = this.formBuilder.group({
      id: [this.user?.id],
      firstName: [this.user?.firstName,],
      lastName: [this.user?.lastName,],
      email: [{ value: this.user?.email, disabled: true }, [Validators.email]],
      addressId: [this.user?.addressId],
      phone: [this.user?.phone, [Validators.pattern('[0-9 ]{11}')]],
    });
  }

  inituserAddressForm(): void {
    this.userAddressForm = this.formBuilder.group({
      street: [this.userAddress?.street],
      houseNumber: [this.userAddress?.houseNumber],
      city: [this.userAddress?.city],
      zip: [this.userAddress?.zip, [Validators.maxLength(5), Validators.minLength(5)]],
    });
  }

  preview(files): void {
    this.userService.preview(files);
  }

  saveUserData(): void {
    this.userService.updateUserData(this.userInfoForm.value, this.userAddressForm.value);
  }
}
