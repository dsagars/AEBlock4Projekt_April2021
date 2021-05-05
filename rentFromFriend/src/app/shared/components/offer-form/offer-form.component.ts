import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { product } from '../../types';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
})
export class OfferFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  reactiveForm = new FormGroup({
    titel: new FormControl(),
    vorname: new FormControl(),
    nachname: new FormControl(),
    adresse: new FormControl(),
    stadt: new FormControl(),
    stadtteil: new FormControl(),
    beschreibung: new FormControl(),
    preis: new FormControl(),
  });

  product: product = {
    id: this.reactiveForm.value.titel + this.reactiveForm.value.vorname,
    title: this.reactiveForm.value.titel,
    description: this.reactiveForm.value.beschreibung,
    price: this.reactiveForm.value.preis,
    city: this.reactiveForm.value.stadt,
    discrict: this.reactiveForm.value.stadtteil,
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log('Produkt Objekt:', this.product);
  };
}
