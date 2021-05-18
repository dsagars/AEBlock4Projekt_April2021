import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Item } from '../../models/item.model';
import { ItemOfferService } from '../../services/offer.service';
import { ItemSearchService } from '../../services/search.service';
import { UserService } from '../../services/user.service';

//TODO: Bilder upload

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
    private searchService: ItemSearchService
  ) {}

  item: Item;
  reactiveForm: FormGroup;

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
      picture: [],
      categorie: [],
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
