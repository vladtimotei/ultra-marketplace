import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';

// components
import { BaseComponent } from '@core/abstracts/base-component.abstract';
// models
import { IAuthUser } from '@models/auth-user.model';
// services
import { UtilsService } from '@services/utils.service';
// store
import { AuthUserFacade } from '@services/auth-user.facade';
import { MarketplaceFacade } from '@services/marketplace.facade';
import {
  AuthUserActions,
  ListingActions,
} from '@core/store/marketplace/actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutPageComponent extends BaseComponent {
  form: FormGroup;
  totalPrice$: Observable<number>;
  purchaseCompleted$: BehaviorSubject<boolean>;

  totalPrice = 0;
  userWalletAmount = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authUserFacade: AuthUserFacade,
    private marketplaceFacade: MarketplaceFacade,
    private utilsService: UtilsService
  ) {
    super();

    this.purchaseCompleted$ = new BehaviorSubject(false);
    this.totalPrice$ = this.marketplaceFacade.basketPrice$;

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
      }),
    });

    // Patch form with data from the auth user
    this.authUserFacade.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((usr: IAuthUser | null) => {
        if (usr) {
          this.form.patchValue(usr);
          this.userWalletAmount = usr.wallet.amount;
        }
      });
    // keep the totalPrice value
    this.totalPrice$
      .pipe(takeUntil(this.destroy$))
      .subscribe((newVal: number) => {
        this.totalPrice = newVal;
      });
  }

  onPay() {
    if (this.form.invalid) {
      this.utilsService.showNotification('Invalid form');
      this.form.markAllAsTouched();
      return;
    }

    // Update User existing wallet amount
    const remainingAmount = this.userWalletAmount - this.totalPrice;
    this.marketplaceFacade.dispatch(
      AuthUserActions.updateUserWalletAmount({ amount: remainingAmount })
    );

    // reset basket
    this.marketplaceFacade.dispatch(ListingActions.clearSelectedProducts());

    this.purchaseCompleted$.next(true);
  }

  goToMarketplace() {
    this.router.navigate(['']);
  }
}
