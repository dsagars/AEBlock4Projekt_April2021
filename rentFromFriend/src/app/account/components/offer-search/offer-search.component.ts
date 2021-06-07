import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/models/item.model';
import { ItemOfferService } from 'src/app/shared/services/offer.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-offer-search',
  templateUrl: './offer-search.component.html',
  styleUrls: ['./offer-search.component.scss'],
})
export class OfferSearchComponent implements OnInit {
  offerItems$: Observable<Item[]>;
  searchItems$: Observable<Item[]>;

  constructor(private offerService: ItemOfferService) {}

  // getting the offer and search of the current user
  ngOnInit(): void {
    this.offerItems$ = this.offerService.getAllOfferFromCurrentUser();
    this.searchItems$ = this.offerService.getAllSearchFromCurrentUser();
  }
}
