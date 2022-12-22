import { NgModule } from '@angular/core';

import { SharedModule } from '@core/modules/shared.module';
import { BasketRoutingModule } from '@basket/basket-routing.module';
import { MarketplaceStoreModule } from '@core/store/marketplace/store.module';

import { BasketPageComponent } from '@basket/page/basket.component';
import { BasketItemComponent } from '@basket/components/basket-item/basket-item.component';


@NgModule({
  declarations: [BasketPageComponent, BasketItemComponent],
  imports: [
    SharedModule,
    BasketRoutingModule,
    MarketplaceStoreModule,
  ],
})
export class BasketModule {}
