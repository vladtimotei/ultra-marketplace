import { Action, combineReducers, createFeatureSelector } from '@ngrx/store';

import {
  AUTH_USER_FEATURE_KEY,
  authUserReducer,
  AuthUserState,
} from './user.reducers';
import {
  LISTING_FEATURE_KEY,
  listingReducer,
  ListingState,
} from './listing.reducers';

export const MARKETPLACE_MODULE_KEY = 'marketplace';

export interface MarketplaceModuleState {
  [AUTH_USER_FEATURE_KEY]: AuthUserState;
  [LISTING_FEATURE_KEY]: ListingState;
}

export function reducers(
  state: MarketplaceModuleState | undefined,
  action: Action
) {
  return combineReducers({
    [AUTH_USER_FEATURE_KEY]: authUserReducer,
    [LISTING_FEATURE_KEY]: listingReducer,
  })(state, action);
}

export const selectMarketplaceModuleState =
  createFeatureSelector<MarketplaceModuleState>(MARKETPLACE_MODULE_KEY);
