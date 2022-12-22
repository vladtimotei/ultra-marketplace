import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

// local imports.
import { effects } from './effects';
import { reducers } from './reducers';

@NgModule({
    imports: [StoreModule.forFeature('marketplace', reducers), EffectsModule.forFeature(effects)],
})
export class MarketplaceStoreModule {}
