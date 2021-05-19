import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { Item } from '../../models/item.model';
import { ItemOfferService } from '../../services/offer.service';
import { ItemSearchService } from '../../services/search.service';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../models/user.model';
import { UserAddress } from '../../models/user-address.model';

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
    private sanitizer: DomSanitizer
  ) {}

  item: Item;
  imagePreview;
  reactiveForm: FormGroup;
  imgUrl;
  currentUser: User;
  currentUserAdress: UserAddress;

  @Input()
  containsImage: boolean;
  @Input()
  type: 'offer' | 'form';

  ngOnInit(): void {
    this.reactiveForm = this.formBuilder.group({
      title: [],
      fistname: [],
      lastname: [],
      address: [],
      city: [],
      discrtict: [],
      description: [],
      price: [],
      categorie: [],
    });
    this.userService.getUserFromDB().subscribe((usr) => {
      this.currentUser = { ...usr };
      if (!usr.addressId) return;
      this.userService
        .getCurrentUserAddress(usr.addressId)
        .subscribe((addr) => {
          this.currentUserAdress = { ...addr };
          console.log(this.currentUserAdress);
        });
    });
  }

  handleSubmit() {
    this.item = {
      ...this.reactiveForm.value,
      uid: this.userService.getCurrrentUserUID(),
    };
    if (this.type == 'offer') {
      this.offerService.create(this.item);
    } else {
      this.searchService.create(this.item);
    }
  }

  imageUpload(file) {
    this.offerService.uploadImage(file);

    const blobUrl = URL.createObjectURL(file);

    this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);

    this.close();
  }

  close() {
    this.modalServeice.closeAll();
  }

  clearImg() {
    this.imgUrl = undefined;
  }

  categories = [
    'Garten',
    'Haushalt',
    'Elektonik',
    'Spiele',
    'Freizeit',
    'Auto',
    'Fahrrad',
    'Sport',
  ];
}
