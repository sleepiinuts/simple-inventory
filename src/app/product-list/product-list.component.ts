import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { Store } from '@ngrx/store';
import { State } from '../states/product/product.reducer';
import { ProductActions } from '../states/product/product.actions';
import { CurrencyPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Paginator } from '../models/paginator.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, MatPaginatorModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  // page: Paginator = new Paginator(0, 5, 0);
  page: Paginator = { pageIndex: 0, pageSize: 5, total: 0 };
  pageSizeOption = [1, 5, 10, 25];

  constructor(private store: Store<{ product: State }>) {
    // subscribe to product list changes in global state
    this.store
      .select('product')
      .pipe(takeUntilDestroyed())
      .subscribe((state) => {
        this.products = state.pagingProduct?.products;
        this.page.total = state.pagingProduct?.page.total;
      });

    // dispatch to get product list
    this.store.dispatch(
      ProductActions.loadProducts({
        data: {
          pageIndex: this.page.pageIndex,
          pageSize: this.page.pageSize,
        },
      })
    );
  }
  ngOnInit(): void {}

  onPageChange(event: PageEvent): void {
    this.page = {
      ...this.page,
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    };

    this.store.dispatch(
      ProductActions.loadProducts({
        data: {
          pageIndex: this.page.pageIndex,
          pageSize: this.page.pageSize,
        },
      })
    );
  }
}
