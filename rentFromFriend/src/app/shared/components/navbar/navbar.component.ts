import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCategoryEnum } from '../../models/category.enum';
import { FirebaseService } from '../../services/firebase.service';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() categories: ItemCategoryEnum;
  @Output() categorySelectionChanged:EventEmitter<string> = new EventEmitter();
  selectedCategory: string;

  constructor(
    public modalService: ModalService,
    private firebaseService: FirebaseService,
    ) {     
    }

  ngOnInit(): void { }

  logout(): void {
    this.firebaseService.logout();
  }

  CategorySelectionChanged($event){
      this.categorySelectionChanged.emit($event.value);     
  }
}
