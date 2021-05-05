import { Component, OnInit } from '@angular/core';
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
      picture:[]
    });
  }

  // reactiveForm = new FormGroup({
  //   titel: new FormControl(),
  //   vorname: new FormControl(),
  //   nachname: new FormControl(),
  //   adresse: new FormControl(),
  //   stadt: new FormControl(),
  //   stadtteil: new FormControl(),
  //   beschreibung: new FormControl(),
  //   preis: new FormControl(),
  // });

  handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log('Produkt Objekt:', this.reactiveForm.value);
  };
}
