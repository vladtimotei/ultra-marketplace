import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs';

// local imports
import { BaseComponent } from '@core/abstracts/base-component.abstract';
import { IProduct } from '@models/product.model';
// store
import { MarketplaceFacade } from '@services/marketplace.facade';
import { ListingActions } from '@core/store/marketplace/actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingPageComponent extends BaseComponent implements OnInit {
  items$: Observable<IProduct[]>;
 
  constructor(private marketplaceFacade: MarketplaceFacade) {
    super();

    this.items$ = this.marketplaceFacade.items$;
  }

  ngOnInit() {
    this.manageSubscriptions();
  }

  handleProductSelection(item: IProduct | any) {
    if (!item.selected) {
      this.marketplaceFacade.dispatch(
        ListingActions.addProductToBasket({ item })
      );
    }
  }

  private manageSubscriptions() {
    this.marketplaceFacade.loaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loaded: boolean) => {
        if (!loaded) {
          this.marketplaceFacade.dispatch(ListingActions.fetchAll());
        }
      });
  }
}
