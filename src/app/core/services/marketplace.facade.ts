import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// local imports
import { IProduct } from '@models/product.model';
import { ListingSelectors } from '@core/store/marketplace/selectors';
import { MarketplaceModuleState } from '@core/store/marketplace/reducers';

@Injectable({
  providedIn: 'root',
})
export class MarketplaceFacade {
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  items$: Observable<IProduct[]>;

  basketItems$: Observable<IProduct[]>;
  basketItemsCount$: Observable<number>;
  basketPrice$: Observable<number>;

  constructor(private store: Store<MarketplaceModuleState>) {
    this.loading$ = this.store.pipe(select(ListingSelectors.getIsLoading));
    this.loaded$ = this.store.pipe(select(ListingSelectors.getIsLoaded));
    this.items$ = this.store.pipe(select(ListingSelectors.getAllListing));

    this.basketItems$ = this.store.pipe(
      select(ListingSelectors.getBasketItems)
    );
    this.basketItemsCount$ = this.store.pipe(
      select(ListingSelectors.getBasketItemsCount)
    );
    this.basketPrice$ = this.store.pipe(select(ListingSelectors.getTotalPrice));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
