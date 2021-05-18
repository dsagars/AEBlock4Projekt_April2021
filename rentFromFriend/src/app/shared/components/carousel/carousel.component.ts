import { Component, Inject, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';



export interface Slide {
  slideId: number;
  products: Item[];
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})

export class CarouselComponent implements OnInit {
 
  @Input() slides: Slide[];

  constructor() {}

  ngOnInit() {       
  }

}

