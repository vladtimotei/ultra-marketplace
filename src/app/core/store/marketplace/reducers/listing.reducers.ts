import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// local imports
import { IProduct } from '@models/product.model';
import { ListingActions } from '@core/store/marketplace/actions';

export const LISTING_FEATURE_KEY = 'listing';

export const listingAdapter: EntityAdapter<IProduct> =
  createEntityAdapter<IProduct>({
    selectId: (item) => item.id,
  });

export interface ListingState extends EntityState<IProduct> {
  loading: boolean;
  loaded: boolean;
}

const initialState: ListingState = listingAdapter.getInitialState({
  loading: false,
  loaded: false,
});

export const listingReducer = createReducer(
  initialState,

  on(ListingActions.reset, (state) => ({
    ...state,
    ...initialState,
  })),

  on(ListingActions.fetchAll, (state) => ({
    ...state,
    loading: true,
  })),
  on(ListingActions.fetchAllFailure, (state) => ({
    ...state,
    loading: false,
  })),

  on(ListingActions.fetchAllSuccess, (state, { data }) =>
    listingAdapter.setAll(data, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),
  on(ListingActions.clearSelectedProducts, (state) => {
    const allProducts = Object.values(state.entities).filter(
      (el) => el?.id
    ) as IProduct[];

    return listingAdapter.updateMany(
      allProducts.map((item) => ({
        id: item.id,
        changes: { ...item, selected: false },
      })),
      {
        ...state,
      }
    );
  }),

  // Basket related actions
  on(ListingActions.addProductToBasket, (state, { item }) =>
    listingAdapter.updateOne(
      { id: item.id, changes: { ...item, selected: true } },
      {
        ...state,
        loading: false,
        loaded: true,
      }
    )
  ),
  on(ListingActions.removeProductFromBasket, (state, { item }) =>
    listingAdapter.updateOne(
      { id: item.id, changes: { ...item, selected: false } },
      {
        ...state,
        loading: false,
        loaded: true,
      }
    )
  )
);
