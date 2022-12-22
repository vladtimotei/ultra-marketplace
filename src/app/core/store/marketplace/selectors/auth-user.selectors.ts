import { createSelector } from '@ngrx/store';

import {
  AUTH_USER_FEATURE_KEY,
  AuthUserState,
} from '../reducers/user.reducers';
import {
  selectMarketplaceModuleState,
  MarketplaceModuleState,
} from '../reducers';

const getAuthUserState = createSelector(
  selectMarketplaceModuleState,
  (state: MarketplaceModuleState) => state[AUTH_USER_FEATURE_KEY]
);

export const getUser = createSelector(
  getAuthUserState,
  (state: AuthUserState) => state.user
);
