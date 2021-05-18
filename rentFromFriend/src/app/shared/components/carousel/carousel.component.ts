import { Component, Inject, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent, MatCarouselSlideComponent } from '@ngbmodule/material-carousel';
import { MatCardModule } from '@angular/material/card';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  items: Item[];

  constructor(public itemService: ItemService) { }

  ngOnInit() {
   this.itemService.getItems().subscribe(items => {  
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
