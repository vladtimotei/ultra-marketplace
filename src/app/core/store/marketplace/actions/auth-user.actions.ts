import { createAction, props } from '@ngrx/store';

import { IAuthUser } from '@models/auth-user.model';

export const reset = createAction('[AuthUser] Reset');

export const login = createAction(
  '[AuthUser] Login',
  props<{ user: IAuthUser }>()
);
export const logout = createAction('[AuthUser] Logout');

export const updateUserWalletAmount = createAction(
  '[AuthUser] Update User WalletAmount',
  props<{ amount: number }>()
);