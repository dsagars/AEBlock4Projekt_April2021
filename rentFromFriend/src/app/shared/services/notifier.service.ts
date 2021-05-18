import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  constructor(
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  // Dieser Service bietet an verschiedene Notifications dem User anzuzeigen

  showBasic(displayMessage: string, displayButtonText: string) {
    this.snackBar.open(displayMessage, displayButtonText, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
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
