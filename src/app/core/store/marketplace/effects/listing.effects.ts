import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

// locals
import { IProduct } from '@models/product.model';
import { ListingService } from '@services/listing.service';
import { ListingActions } from '@core/store/marketplace/actions';

interface ApiResponse {
  products: any[];
  total: number;
}
@Injectable()
export class ListingEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListingActions.fetchAll),
      switchMap(() =>
        this.listingService.fetchAll().pipe(
          map((res: ApiResponse) => {
            if (res.products?.length) {
              return ListingActions.fetchAllSuccess({
                data: this.formatData(res.products),
              });
            } else {
              return ListingActions.fetchAllFailure({
                errorMessage: 'Failed to load listing',
              });
            }
          }),
          catchError((error) =>
            of(ListingActions.fetchAllFailure({ errorMessage: error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private listingService: ListingService
  ) {}

  private formatData(list: any[]): IProduct[] {
    return list.map((el: any) => ({
      id: el.id,
      title: el.title,
      price: el.price,
      imageUrl: el.thumbnail,
    }));
  }
}
