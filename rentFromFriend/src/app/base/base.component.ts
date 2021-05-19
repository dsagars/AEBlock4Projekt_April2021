import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Slide } from '../shared/components/carousel/carousel.component';
import { Item } from '../shared/models/item.model';
import { ItemOfferService } from '../shared/services/offer.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
