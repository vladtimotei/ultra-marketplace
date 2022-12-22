import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

// local imports
import { IAuthUser } from '@models/auth-user.model';
import { UtilsService } from '@services/utils.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
})
export class SelectUserDialogComponent {
  users: IAuthUser[];
  selectedUser: IAuthUser | null;

  constructor(
    public dialogRef: MatDialogRef<SelectUserDialogComponent>,
    private utilsService: UtilsService
  ) {
    this.selectedUser = null;
    this.users = [
      {
        firstName: 'Martin',
        lastName: 'Kant',
        id: 'MTK',
        wallet: { amount: 2400 },
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        id: 'JDE',
        wallet: { amount: 4400 },
      },
    ];
  }

  onUserSelect(user: IAuthUser) {
    this.selectedUser = user;
  }

  onSubmit() {
    if (!this.selectedUser) {
      this.utilsService.showNotification('Select an user first');
      return; 
    }
    this.dialogRef.close(this.selectedUser);
  }
}
