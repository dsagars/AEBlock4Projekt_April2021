import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-offer-search-card',
  templateUrl: './offer-search-card.component.html',
  styleUrls: ['./offer-search-card.component.scss']
})
export class OfferSearchCardComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
