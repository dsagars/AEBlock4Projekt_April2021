import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserUID(): any {
    return this.getUser().uid;
  }
}
