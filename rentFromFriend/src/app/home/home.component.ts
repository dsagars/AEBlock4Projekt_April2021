import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService : FirebaseService) { }

  ngOnInit(): void {
  }

  logout(){
    this.firebaseService.logout() 
    this.isLogout.emit();
  }

}
