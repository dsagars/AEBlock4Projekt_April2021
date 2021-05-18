import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-not-verified',
  templateUrl: './email-not-verified.component.html',
  styleUrls: ['./email-not-verified.component.scss'],
})
export class EmailNotVerifiedComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  sendUserToLogin() {
    this.router.navigate(['/login']);
  }
}