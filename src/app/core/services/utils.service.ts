import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// local imports
import { SnackBarComponent } from '@core/components';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message,
      },
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
