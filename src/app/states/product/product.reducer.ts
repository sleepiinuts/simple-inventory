import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { Product } from '../models/product.model';

export const productFeatureKey = 'product';

export interface State {
  products: Product[];
}

export const initialState: State = {
  products: [],
};

export const reducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, props) => ({
    ...state,
    products: [...props.data],
  }))
);
