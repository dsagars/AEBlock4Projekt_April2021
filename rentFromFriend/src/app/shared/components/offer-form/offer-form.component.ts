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
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  file: File;

  @Input()
  containsImage: boolean;
  @Input()
  type: 'offer' | 'search';

  ngOnInit(): void {
    this.userService.getUserFromDB().subscribe((usr) => {
      this.currentUser = { ...usr };
      if (!usr.addressId) return;
      this.userService
        .getCurrentUserAddress(usr.addressId)
        .subscribe((addr) => {
          this.currentUserAdress = { ...addr };

          this.reactiveForm = this.formBuilder.group({
            title: [],
            fistname: [this.currentUser?.firstName],
            lastname: [this.currentUser?.lastName],
            address: [this.currentUserAdress?.street],
            city: [this.currentUserAdress?.city],
            discrtict: [],
            description: [],
            price: [],
            categorie: [],
          });
        });
    });
  }

  handleSubmit() {
    this.item = {
      ...this.reactiveForm.value,
      uid: this.userService.getCurrrentUserUID(),
    };

    if (this.type === 'offer') {
      this.offerService.create(this.item);
    } else {
      this.searchService.create(this.item);
    }
    this.close();
  }

  imagePre(file) {
    const blobUrl = URL.createObjectURL(file);
    this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);
    this.offerService.file = file;
    console.log('imagePre', this.offerService.file);
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
