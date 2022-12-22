import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasketPageComponent } from '@basket/page/basket.component';

const routes: Routes = [{
  path: '',
  component: BasketPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketRoutingModule { }
