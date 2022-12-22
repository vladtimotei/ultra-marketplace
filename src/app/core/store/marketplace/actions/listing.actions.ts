import { createAction, props } from '@ngrx/store';

import { IProduct } from '@models/product.model';

export const reset = createAction('[Listing] Reset');
export const clearSelectedProducts = createAction('[Listing] Clear Selected Products');

export const fetchAll = createAction('[Listing] Fetch All');
export const fetchAllSuccess = createAction(
  '[Listing] Fetch All Success',
  props<{ data: IProduct[] }>()
);
export const fetchAllFailure = createAction(
  '[Listing] Fetch All Failure',
  props<{ errorMessage: string }>()
);

export const addProductToBasket = createAction(
  '[Basket] Add Product',
  props<{ item: IProduct }>()
);
export const removeProductFromBasket = createAction(
  '[Basket] Remove Product',
  props<{ item: IProduct }>()
);
