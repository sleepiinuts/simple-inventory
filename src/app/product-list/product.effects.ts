import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Product } from '../models/product.model';
import { ProductActions } from '../states/product.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  private products: Product[] = [
    {
      sku: 'NIKE-BLCK-42-M-1',
      name: 'stan smith sneaker',
      imageUrl: 'Stan_Smith_Lux_Shoes_Black_IH2450_01_standard.avif',
      department: ['Mens', 'Shoes', 'Running Shoes'],
      price: 109.9,
    },
  ];

  private actions$ = inject(Actions);

  constructor() {}

  getAll = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      exhaustMap(() =>
        of(this.products).pipe(
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
