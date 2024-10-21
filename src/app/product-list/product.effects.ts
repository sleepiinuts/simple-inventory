import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Product } from '../models/product.model';
import { ProductActions } from '../states/product.actions';
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
      exhaustMap(() =>
        this.http
          .get<Product[]>(`${ProductEffects.url}${ProductEffects.product}`)
          .pipe(
            map((products) =>
              ProductActions.loadProductsSuccess({ data: products })
            ),
            catchError((err) =>
              of(ProductActions.loadProductsFailure({ error: err }))
            )
          )
      )
    )
  );
}
