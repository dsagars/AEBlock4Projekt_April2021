import { Component, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/components/carousel/carousel.component';
import { Item } from 'src/app/shared/models/item.model';
import { ItemOfferService } from 'src/app/shared/services/offer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: Item[];
  slides: Slide[] = [];
  constructor(private itemOfferService: ItemOfferService) { }

  ngOnInit(): void {
    this.itemOfferService
      .getAll()
      .valueChanges()//.pipe(map(items => this.getCategoryItems(items, 'Elektro'))) // output value from navbar select
      .subscribe((items) => {
        this.items = this.slideChunk(items, 4);
        this.fillSlides(this.items);
        console.log(this.items);
      });
  }

  // getCategoryItems(array: Item[], category: string) {
  //   return array.filter(item => item.categorie === category)
  // }

  /**
   * Returns array of array of items
   * @param array Incoming array from firebase service
   * @param chunkSize Number of items displayed on each slide
   * @returns Returns all the items in firebase list, each chunk with certain number of items(chunkSize) as an array
   */
  slideChunk(array: Item[], chunkSize: number) {
    let R = [];
    for (let i = 0, len = array.length; i < len; i += chunkSize) {
      R.push(array.slice(i, i + chunkSize));
    }
    return R;
  }

  /**
   * Maps each array returning from slideChunk to a slide
   * @param arr Incoming array from slideChunk
   */
  fillSlides(arr: any[]) {
    for (let i = 0, len = arr.length; i < len; i++) {
      let slide: Slide = {
        slideId: i,
        products: arr[i],
      };
      this.slides[i] = slide;
    }
  }
}
