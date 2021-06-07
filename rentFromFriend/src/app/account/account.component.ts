import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  showFiller = false;
  breakpoint = 500;
  showSidebar = true;

  constructor() {}

  ngOnInit(): void {
    if (window.innerWidth <= this.breakpoint) {
      this.showSidebar = false;
    }
  }
}
