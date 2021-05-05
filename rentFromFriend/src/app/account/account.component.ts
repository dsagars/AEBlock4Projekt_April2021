import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../shared/services/sidenav.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  showFiller = false;
  @ViewChild('drawer') public sidenav: MatSidenav;
  constructor(public sidenavService: SidenavService) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.sidenavService.open();
  }

}
