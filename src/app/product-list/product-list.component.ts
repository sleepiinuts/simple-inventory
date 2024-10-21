import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { Store } from '@ngrx/store';
import { State } from '../states/product/product.reducer';
import { ProductActions } from '../states/product/product.actions';
import { CurrencyPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, MatPaginatorModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  categories: string[] = ['Men', 'Shoes', 'Running Shoes'];
  products: Product[] = [];

  constructor(private store: Store<{ product: State }>) {
    // subscribe to product list changes in global state
    this.store
      .select('product')
      .pipe(takeUntilDestroyed())
      .subscribe((state) => (this.products = state?.products));

    // dispatch to get product list
    this.store.dispatch(ProductActions.loadProducts());
  }

  notify(event: PageEvent): void {
    console.log(event.pageIndex, event.pageSize);
  }
}
