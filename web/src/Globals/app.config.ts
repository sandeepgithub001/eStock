import { Injectable } from "@angular/core";
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBar, MatSnackBarConfig } from '@angular/material';


@Injectable({
  providedIn: 'root'
})

export class AppConfig {
  actionButtonLabel = 'Retry';
  action = false;
  setAutoHide = true;
  autoHide = 3000;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(public snackBar: MatSnackBar) {
  }


  showNotification(message) {

    const config = new MatSnackBarConfig();
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.verticalPosition = this.verticalPosition;

    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }
}


