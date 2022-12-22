import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// local imports
import { IAuthUser } from '@models/auth-user.model';
import { AuthUserSelectors } from '@core/store/marketplace/selectors';
import { MarketplaceModuleState } from '@core/store/marketplace/reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthUserFacade {
  user$: Observable<IAuthUser | null>;

  constructor(private store: Store<MarketplaceModuleState>) {
    this.user$ = this.store.pipe(select(AuthUserSelectors.getUser));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
