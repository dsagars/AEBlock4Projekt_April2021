import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Slide } from '../shared/components/carousel/carousel.component';
import { Item } from '../shared/models/item.model';
import { ItemOfferService } from '../shared/services/offer.service';
import { ItemCategoryEnum } from '../shared/models/category.enum';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  items: Item[];
  slides: Slide[] = []; 
  public itemCategory = ItemCategoryEnum;
  enumKeys: string[];
  selectedValue: string;
  
  constructor(private itemOfferService: ItemOfferService) {
    this.enumKeys = Object.keys(this.itemCategory);//.filter(f => !isNaN(Number(f)));
  }
  
  ngOnInit(): void {
    this.itemOfferService
      .getAll()
      .valueChanges()//.pipe(map(items => this.getCategoryItems(items, this.setChildProperty(this.selectedValue)))) // output value from navbar select
      .subscribe((items) => {      
        this.items = this.slideChunk(items, 4);
        this.fillSlides(this.getCategoryItems(this.items, this.selectedValue));
        console.log("asadasdadadadadadad",this.getCategoryItems(this.items, this.selectedValue))    
      });    
  }

  getCategoryItems(array: Item[], category?: string) {
    if(category===undefined){   
      return array;
    }
    else{
      // console.log("Category: ", category);
      // console.log("Array: ", array);
      return array.filter(item => item.categorie === category);
    }
  }
    
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

  OnCategorySelectionChanged(selectedValue: string){
    this.selectedValue = selectedValue;
    this.getCategoryItems(this.items, selectedValue);
  }
}
