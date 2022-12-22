import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// components
import { BaseComponent } from '@core/abstracts/base-component.abstract';
import { SelectUserDialogComponent } from '@core/dialogs';
// models
import { IAuthUser } from '@models/auth-user.model';
// store
import { AuthUserFacade } from '@services/auth-user.facade';
import { MarketplaceFacade } from '@services/marketplace.facade';
import { AuthUserActions } from '@core/store/marketplace/actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent extends BaseComponent {
  authUser$: Observable<IAuthUser | null>;

  basketCount$: Observable<number>;

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router,
    // locals
    private marketplaceFacade: MarketplaceFacade,
    private authUserFacade: AuthUserFacade
  ) {
    super();

    this.authUser$ = this.authUserFacade.user$;
    this.basketCount$ = this.marketplaceFacade.basketItemsCount$;
  }

  ngOnInit(): void {
    this.openSelectUserDialog();
  }

  goToBasket() {
    this.router.navigate(['basket']);
  }

  goToMarketplace() {
    this.router.navigate(['']);
  }

  private openSelectUserDialog() {
    const dialogRef = this.dialog.open(SelectUserDialogComponent, {
      width: '450px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((user: IAuthUser) => {
      this.authUserFacade.dispatch(AuthUserActions.login({ user }));
    });
  }
}
