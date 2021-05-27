import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-not-verified',
  templateUrl: './email-not-verified.component.html',
  styleUrls: ['./email-not-verified.component.scss'],
})
export class EmailNotVerifiedComponent implements OnInit {
  
  // import Router to be able to redirect user to another page
  constructor(private router: Router) {}

  ngOnInit(): void {}

  // On Button click send user back to login
  sendUserToLogin() {
    this.router.navigate(['/login']);
  }
}