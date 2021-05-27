import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { Item } from '../../models/item.model';
import { ItemOfferService } from '../../services/offer.service';
import { ItemSearchService } from '../../services/search.service';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../models/user.model';
import { UserAddress } from '../../models/user-address.model';
import { Categories } from '../../models/categories.model';
import { NotifierService } from '../../services/notifier.service';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
})
export class OfferFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private offerService: ItemOfferService,
    private userService: UserService,
    private searchService: ItemSearchService,
    private modalServeice: ModalService,
    private sanitizer: DomSanitizer,
    private notifier: NotifierService
  ) {}

  item: Item;
  imagePreview;
  reactiveForm: FormGroup;
  imgUrl;
  currentUser: User;
  currentUserAdress: UserAddress;
  file: File;
  categories: Array<string>;
  startDate = new Date();

  //props make this component reusable for "search" and "offer"
  @Input()
  containsImage: boolean;
  @Input()
  type: 'offer' | 'search';

  ngOnInit(): void {
    //create array from enum
    this.categories = Object.keys(Categories).filter((key) => isNaN(+key));

    //init of Form. some are required
    this.reactiveForm = this.formBuilder.group({
      title: ['', Validators.required],
      fistname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      discrtict: [],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      dueDate: ['', Validators.required],
      friendsOnly: [''],
    });

    //get User from DB to prefill his Userinformation
    this.userService.getUserFromDB().subscribe((usr) => {
      this.currentUser = { ...usr };
      if (!usr.addressId) return;
      this.userService
        .getCurrentUserAddress(usr.addressId)
        .subscribe((addr) => {
          this.currentUserAdress = { ...addr };
          this.reactiveForm.setValue({
            title: null,
            fistname: this.currentUser?.firstName,
            lastname: this.currentUser?.lastName,
            address: this.currentUserAdress?.street,
            city: this.currentUserAdress?.city,
            discrtict: null,
            description: null,
            price: null,
            dueDate: null,
            category: null,
            friendsOnly: null,
          });
        });
    });
  }

  //handle Submit of form
  handleSubmit() {
    this.item = {
      ...this.reactiveForm.value,
      uid: this.userService.getCurrrentUserUID(),
      timeStamp: new Date().toISOString(),
    };
    if (!this.reactiveForm.valid) {
      console.error('invalid form');
      //notification handler
      this.notifier.showBasic('Bitte alle Felder ausfüllen', 'Ok');
      return;
    }

    //switch between handling of "offer" and "search"
    if (this.type === 'offer') {
      this.offerService.uploadOffer(this.item);
    } else {
      this.searchService.create(this.item);
    }
    this.close();
  }
  // displaying the img before it gets uploaded to out server
  imagePre(file) {
    const blobUrl = URL.createObjectURL(file);
    this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);
    this.offerService.file = file;
  }

  close() {
    this.modalServeice.closeAll();
  }

  clearImg() {
    this.imgUrl = undefined;
  }
}
