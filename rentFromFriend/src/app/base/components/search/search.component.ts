import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    this.params = this.activatedRoute.snapshot.queryParams;
  }

  ngOnInit(): void {
    this.items$ = this.itemOfferService
      .getItemByQueries(this.params);

  }

}
