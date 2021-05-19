import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAddress } from 'src/app/shared/modles/user-address.model';
import { User } from 'src/app/shared/modles/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  userAddress: UserAddress;
  userInfoForm: FormGroup;
  userAddressForm: FormGroup;
  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.userFromDB$.subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.initUserInfoForm();
      this.inituserAddressForm();
      this.userService.getUserImage();
      this.userService.getCurrentUserAddress(this.user?.addressId).subscribe(userAddress => {
        this.userAddress = userAddress;
        this.inituserAddressForm();
      });
    });
  }

  initUserInfoForm(): void {
    this.userInfoForm = this.formBuilder.group({
      id: [this.user?.id],
      firstName: [this.user?.firstName,],
      lastName: [this.user?.lastName,],
      email: [this.user?.email, [Validators.email]],
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
