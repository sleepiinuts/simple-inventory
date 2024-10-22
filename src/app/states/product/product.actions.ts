import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PagingProduct } from '../../models/product.model';

export const ProductActions = createActionGroup({
  source: 'Product',
  events: {
    'Load Products': props<{ data: { pageIndex: number; pageSize: number } }>(),
    'Load Products Success': props<{ data: PagingProduct }>(),
    'Load Products Failure': props<{ error: Error }>(),
  },
});
