import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public modalService: ModalService,
    private router: Router,
    private sidenavService: SidenavService) { }

  ngOnInit(): void { }

  openSidenav() {
    this.sidenavService.open();
  }

  navigateToProfile() {
    this.router.navigate(['account/profile']);
    this.openSidenav();
  }

  navigateToMessage() {
    this.router.navigate(['account/message']);
    this.openSidenav();
  }

  navigateToManageFriend() {
    this.router.navigate(['account/manage-friend']);
    this.openSidenav();
  }

  navigateToSetting() {
    this.router.navigate(['account/setting']);
    this.openSidenav();
  }
}
