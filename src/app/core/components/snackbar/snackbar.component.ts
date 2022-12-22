import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  template: `
    <div class="zmt-snack-container" fxLayoutAlign="space-between center">
      <span>{{ data?.message }}</span>
      <div>
        <span class="c-pointer" (click)="close()">X</span>
      </div>
    </div>
  `,
  styles: [
    `
      .zmt-snack-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: normal;
      }
    `,
  ],
})
export class SnackBarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private _snackRef: MatSnackBarRef<SnackBarComponent>
  ) {}

  close() {
    this._snackRef.dismiss();
  }
}
