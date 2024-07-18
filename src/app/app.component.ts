import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService, Product } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'test-angular-18-naja';

  appService = inject(AppService);

  productList = signal<Product[]>([]);

  newCounter = signal({ value: 0 });

  counter = signal<number>(0);

  constructor() {
    this.getProductList();
  }

  getProductList() {
    this.appService.getProductList().then((res: Product[]) => {
      console.log('getProductList in appComponent =>', res);
      this.productList.set(res);
    });
  }

  onclickUpdateCount() {
    // this.counter.set(2)
    this.counter.update((count: number) => count + 1);
  }

  onClickDeleteProduct() {
    this.productList.update((products: Product[]) => {
      let newProduct = products;
      if (products) {
        products.pop();
      }
      return newProduct;
    });
  }

  onClickUpdateNewCount() {
    this.newCounter.update((newCount) => {
      return { value: newCount.value + 1 };
    });
  }
}
