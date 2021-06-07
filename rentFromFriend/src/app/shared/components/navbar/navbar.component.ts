import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from '../../models/categories.model';
import { FirebaseService } from '../../services/firebase.service';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  categories = Object.keys(Categories);
  categoryToSearch: string;
  @Output() categorySelectionChanged: EventEmitter<string> = new EventEmitter();
  selectedCategory: string;


  constructor(
    public modalService: ModalService,
    private firebaseService: FirebaseService,
    private router: Router) { }

  ngOnInit(): void { }

  // logout
  logout(): void {
    this.firebaseService.logout();
  }

  // search input functionality and giving the searchText and zip through queryParams
  search(searchText: string, zip: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['base/search'], { queryParams: { searchText: searchText, category: this.selectedCategory, zip: zip } }));
  }

  // getting the category
  CategorySelectionChanged($event) {
    this.selectedCategory = $event.value;
  }


}
