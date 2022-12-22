import { NgModule } from '@angular/core';

import { MarketplaceStoreModule } from '@core/store/marketplace/store.module';
import { SharedModule } from '@core/modules/shared.module';

import { MarketplaceFacade } from '@services/marketplace.facade';

import { ToolbarComponent } from '@core/modules/toolbar/toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [SharedModule, MarketplaceStoreModule],
  exports: [ToolbarComponent],
  providers: [MarketplaceFacade]
})
export class ToolbarModule {}
