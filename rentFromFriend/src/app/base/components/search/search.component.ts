import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Item } from 'src/app/shared/models/item.model';
import { ItemOfferService } from 'src/app/shared/services/offer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  params;
  items$: Observable<Item[]>;

  constructor(private activatedRoute: ActivatedRoute, private itemOfferService: ItemOfferService) {
    this.params = this.activatedRoute.snapshot.queryParams; // getting the url params
  }

  ngOnInit(): void {
    // filter the items for the search
    this.items$ = this.itemOfferService
      .getItemOffer().pipe(map(items => (!this.params.category && !this.params.searchText && !this.params.zip) ? items :
        items.filter(item =>
          item.category === this.params.category ||
          (item.title.toLowerCase().includes(this.params.searchText.toLowerCase()) ||
            item.description.toLowerCase().includes(this.params.searchText.toLowerCase())) ||
          (item.city === this.params.zip)
        )));
  }
}
