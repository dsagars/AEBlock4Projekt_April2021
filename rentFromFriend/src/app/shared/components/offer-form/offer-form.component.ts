import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Product } from '../../modles/product.model';

//TODO: Bilder upload

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
})
export class OfferFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  product: Product;
  reactiveForm: FormGroup;

  @Input()
  containsImage: boolean;

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

  handleSubmit(e: Event) {
    e.preventDefault();
    console.log('eintrag:', this.reactiveForm);
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
