import { Component, Inject, OnInit } from '@angular/core';
import { Item } from '../../modles/item.model';
import { ItemOfferService } from '../../services/offer.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  items: Item[];

  constructor(public itemOfferService: ItemOfferService) { }

  ngOnInit() {
   this.itemOfferService.getAll().valueChanges().subscribe(items => {  
     this.items = this.slideChunk(items, 4);  
     console.log(this.items);   
   })
  }

  slideChunk(array: Item[], chunkSize: number){
    let R = [];
    for (let i = 0, len = array.length; i < len; i += chunkSize) {
      R.push(array.slice(i, i + chunkSize));
    }
    return R;  
  }
}
