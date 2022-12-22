import { createReducer, on } from '@ngrx/store';

// local imports
import { IAuthUser } from '@models/auth-user.model';
import { AuthUserActions } from '@core/store/marketplace/actions';

export const AUTH_USER_FEATURE_KEY = 'auth-user';

export interface AuthUserState {
  loggedIn: boolean;
  user: IAuthUser | null,
}

const initialState: AuthUserState = {
  loggedIn: false,
  user: null,
};

export const authUserReducer = createReducer(
  initialState,

  on(AuthUserActions.reset, (state) => ({
    ...state,
    ...initialState,
  })),

  on(AuthUserActions.login, (state, { user }) => ({
    ...state,
    loggedIn: true,
    user,
  })),

  on(AuthUserActions.logout, (state) => ({
    ...state,
    loggedIn: false,
    user: null
  })),
  on(AuthUserActions.updateUserWalletAmount, (state, {amount} ) => ({
    ...state,
    user: {
      ...state.user as IAuthUser ,
      wallet: {
        amount
      }
    }
  }))
);
