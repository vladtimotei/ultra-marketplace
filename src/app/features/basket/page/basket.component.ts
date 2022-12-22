import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, takeUntil } from 'rxjs';

// models
import { BaseComponent } from '@core/abstracts/base-component.abstract';
import { IAuthUser } from '@models/auth-user.model';
import { IProduct } from '@models/product.model';
// store
import { AuthUserFacade } from '@services/auth-user.facade';
import { MarketplaceFacade } from '@services/marketplace.facade';
import { ListingActions } from '@core/store/marketplace/actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketPageComponent extends BaseComponent {
  items$: Observable<IProduct[]>;
  totalPrice$: Observable<number>;
  checkoutDisabled$: BehaviorSubject<boolean>;

  walletAmount = 0;

  constructor(
    private authUserFacade: AuthUserFacade,
    private marketplaceFacade: MarketplaceFacade,
    private router: Router
  ) {
    super();

    this.checkoutDisabled$ = new BehaviorSubject(true);
    this.items$ = this.marketplaceFacade.basketItems$;
    this.totalPrice$ = this.marketplaceFacade.basketPrice$;
  }

  ngOnInit() {
    this.authUserFacade.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((usr: IAuthUser | null) => {
        if (usr?.wallet?.amount) {
          this.walletAmount = usr?.wallet?.amount;
        }
      });

    this.totalPrice$
      .pipe(takeUntil(this.destroy$))
      .subscribe((newVal: number) => {
        if (newVal && newVal > this.walletAmount) {
          this.checkoutDisabled$.next(true);
        } else {
          this.checkoutDisabled$.next(false);
        }
      });
  }

  goToCheckout() {
    this.router.navigate(['checkout']);
  }

  handleProductRemoval(item: IProduct | any) {
    this.marketplaceFacade.dispatch(ListingActions.removeProductFromBasket({ item }));
  }
}
