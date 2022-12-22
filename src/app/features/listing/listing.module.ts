import { NgModule } from '@angular/core';

import { ListingRoutingModule } from '@listing/listing-routing.module';
import { ListingPageComponent } from '@listing/page/listing.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

import { MarketplaceStoreModule } from '@core/store/marketplace/store.module';
import { SharedModule } from '@core/modules/shared.module';

@NgModule({
  declarations: [ListingPageComponent, ProductCardComponent],
  imports: [ListingRoutingModule, SharedModule, MarketplaceStoreModule],
})
export class ListingModule {}
