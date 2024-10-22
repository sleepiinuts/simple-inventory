import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { PagingProduct } from '../../models/product.model';
import { Paginator } from '../../models/paginator.model';

export const productFeatureKey = 'product';

export interface State {
  pagingProduct: PagingProduct;
}

export const initialState: State = {
  pagingProduct: {
    products: [],
    page: new Paginator(),
  },
};

export const reducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, props) => ({
    ...state,
    pagingProduct: props.data,
  }))
);
