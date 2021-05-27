import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

/*
  This service has the purpose to show notifications to the user 
  wherever needed.
*/
export class NotifierService {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  /* 
   This shows a basic notification where the notification stays
   until the user closes it
  */
  showBasic(displayMessage: string, displayButtonText: string) {
    this.snackBar.open(displayMessage, displayButtonText, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar-style'],
    });
  }

  /* 
   This shows a basic notification where the notification stays
   until the user closes it, once closed it will take the user to login 
   page
  */
  showBasicAndNavigateToLogin(
    displayMessage: string,
    displayButtonText: string
  ) {
    let snackBar = this.snackBar.open(displayMessage, displayButtonText, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar-style'],
    });
    snackBar.afterDismissed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  /* 
   This shows a notification where the notification stays
   for 5 seconds and closes by itself
  */
  showForFiveSeconds(displayMessage: string, displayButtonText: string) {
    this.snackBar.open(displayMessage, displayButtonText, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar-style'],
    });
  }

  /* 
   This shows a notification where the notification stays
   for custom time set and closes by itself
  */
  showForCustomTime(
    displayMessage: string,
    displayButtonText: string,
    howLong: number
  ) {
    this.snackBar.open(displayMessage, displayButtonText, {
      duration: howLong,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar-style'],
    });
  }

  /* 
   This shows a notification where the notification stays
   until the user closes it, once closed it will refresh the current
   page
  */
  showAndRefreshPageAfterDismissal(
    displayMessage: string,
    displayButtonText: string
  ) {
    let snackBarRef = this.snackBar.open(displayMessage, displayButtonText, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar-style'],
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.refreshPage();
    });
  }

  // refresh the current page
  refreshPage() {
    this._document.defaultView.location.reload();
  }
}
