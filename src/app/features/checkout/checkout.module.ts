import { NgModule } from '@angular/core';

import { SharedModule } from '@core/modules/shared.module';

import { CheckoutRoutingModule } from '@checkout/checkout-routing.module';
import { CheckoutPageComponent } from '@checkout/page/checkout.component';

import { MarketplaceFacade } from '@services/marketplace.facade';

@NgModule({
  declarations: [CheckoutPageComponent],
  imports: [CheckoutRoutingModule, SharedModule],
  providers: [MarketplaceFacade]
})
export class CheckoutModule {}
