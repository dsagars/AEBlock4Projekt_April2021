import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public modalService: ModalService,
    private firebaseService: FirebaseService) { }

  ngOnInit(): void { }

  logout(): void {
    this.firebaseService.logout();
  }
}
