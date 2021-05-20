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

  showItem(item: Item) {
    console.log(item);
    this.router.navigate([`/base/product-details/${item.id}`], { state: { data: this.item } });
  }
}
