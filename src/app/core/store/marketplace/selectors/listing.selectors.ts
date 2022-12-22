import { createSelector } from '@ngrx/store';

import {
  LISTING_FEATURE_KEY,
  ListingState,
  listingAdapter,
} from '../reducers/listing.reducers';
import {
  selectMarketplaceModuleState,
  MarketplaceModuleState,
} from '../reducers/index';

import { IProduct } from '@models/product.model';

const getListingState = createSelector(
  selectMarketplaceModuleState,
  (state: MarketplaceModuleState) => state[LISTING_FEATURE_KEY]
);

const { selectAll, selectEntities } =
  listingAdapter.getSelectors(getListingState);

export const getAllListing: (state: object) => IProduct[] = selectAll;

export const getIsLoading = createSelector(
  getListingState,
  (state: ListingState) => state.loading
);

export const getIsLoaded = createSelector(
  getListingState,
  (state: ListingState) => state.loaded
);

export const getBasketItems = createSelector(selectAll, (items: IProduct[]) =>
  items.filter((el: IProduct) => el.selected)
);
export const getBasketItemsCount = createSelector(
  selectAll,
  (items: IProduct[]) => items.filter((el: IProduct) => el.selected).length
);
export const getTotalPrice = createSelector(
  getBasketItems,
  (items: IProduct[]) => {
    let sum = 0;
    items.forEach((el: IProduct) => (sum += el.price));
    return sum;
  }
);
