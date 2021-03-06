import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-offer-search-card',
  templateUrl: './offer-search-card.component.html',
  styleUrls: ['./offer-search-card.component.scss']
})
export class OfferSearchCardComponent implements OnInit {
  @Input() item: Item;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // navigate to product-details and give data through the url
  showItem(item: Item) {
    this.router.navigate([`/base/product-details/${item.id}`], { state: { data: this.item } });
  }
}
