import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PagingProduct } from '../models/product.model';
import { ProductActions } from '../states/product/product.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductEffects {
  static url: string = 'http://localhost:8080/';
  static product: string = 'product';

  private actions$ = inject(Actions);

  constructor(private http: HttpClient) {}

  getAll = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      exhaustMap((props) =>
        this.http
          .get<PagingProduct>(
            `${ProductEffects.url}${ProductEffects.product}?pageIndex=${props.data.pageIndex}&pageSize=${props.data.pageSize}`
          )
          .pipe(
            map((pagingProduct) =>
              ProductActions.loadProductsSuccess({ data: pagingProduct })
            ),
            catchError((err) =>
              of(ProductActions.loadProductsFailure({ error: err }))
            )
          )
      )
    )
  );
}
