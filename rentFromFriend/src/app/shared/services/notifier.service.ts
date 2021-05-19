import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  // Dieser Service bietet an verschiedene Notifications dem User anzuzeigen

  showBasic(displayMessage: string, displayButtonText: string) {
    this.snackBar.open(displayMessage, displayButtonText, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  showBasicAndNavigateToLogin(displayMessage: string, displayButtonText: string) {
    let snackBar = this.snackBar.open(displayMessage, displayButtonText, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    snackBar.afterDismissed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  showForFiveSeconds(displayMessage: string, displayButtonText: string) {
    this.snackBar.open(displayMessage, displayButtonText, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  showAndRefreshPageAfterDismissal(
    displayMessage: string,
    displayButtonText: string
  ) {
    let snackBarRef = this.snackBar.open(displayMessage, displayButtonText, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.refreshPage();
    });
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }
}
