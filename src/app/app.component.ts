import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService, Product } from './app.service';
import { BehaviorSubject, combineLatest, map, Subject, tap } from 'rxjs';
import { CardComponent } from './card.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'test-angular-18-naja';

  appService = inject(AppService);

  // Writable signals : if not call this not to do
  productList = signal<Product[]>([]);

  newCounter = signal({ value: 0 });

  counter = signal<number>(2);
  //  ------ Writable signals ------ //

  // cannot to do this if use asReadonly
  testReadOnly = signal('READ ONLY').asReadonly();

  // for map value or other~ computed is signalReadonly
  counterX2 = computed(() => {
    // console.log('logX2 in computed');
    return this.counter() * 2;
  });

  // subject1 = new Subject();
  // subject2 = new Subject();

  subject1 = new BehaviorSubject(0);
  subject2 = new BehaviorSubject(0);

  // ------ diamond dependency problem ------ //
  signal1 = signal(0);
  signal2 = signal(0);
  signalComputed = computed(() => {
    // console.log('signal1 =>', this.signal1(), 'signal2 =>', this.signal2())
    return [this.signal1(), this.signal2()];
  });

  // untracked is not tracking data change **untracked use with computed & effect
  sumValue = computed(() => {
    return this.signal1() + untracked(() => this.signal2());
  });

  subjectCombine = combineLatest([this.subject1, this.subject2]).pipe(
    // tap(([sub1, sub2]) =>
    //   console.log('logCombine sub1 =>', sub1, 'sub2 =>', sub2)
    // ),
    map(([sub1, sub2]) => {
      return [sub1, sub2];
    })
  );
  // ------ diamond dependency problem ------ //

  constructor() {
    // do this some signal one time in effect //
    // effect(() => {
    // infinity loop 🚨🚨🚨🚨🚨🚨 ***if call signal before update in effect***
    // when update value bla bla bla แบบนี้อ่้ะ
    // this.counter.update((counter) => counter * 2)
    // console.log('counter in effect =>', this.counter());
    // 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨 //
    // },{
    //   allowSignalWrites: true
    // });
    // ----------------------------------------- //
    effect(() => {
      console.log('sum signal untrack =>', this.signal1()+untracked(() => this.signal2()))
      console.log('sum signal =>', this.signal1()+this.signal2())
      console.log('sumValue =>', this.sumValue())
    })
    this.getProductList();
    // console.log(
    //   'counter =>',
    //   this.counter(),
    //   '\nCOUNTERX2 =>',
    //   this.counterX2()
    // );
    // console.log('logX2', this.counterX2());
    // this.counter.set(4);
    // console.log('set counter', this.counterX2());
    // this.counter.set(4);
    // console.log('set 2 counter', this.counterX2());
    this.subjectCombine.subscribe();
  }

  getProductList() {
    this.appService.getProductList().then((res: Product[]) => {
      // console.log('getProductList in appComponent =>', res);
      this.productList.set(res);
    });
  }

  onClickUpdateCount() {
    // this.counter.set(2)
    this.counter.update((count: number) => count + 1);
    console.log(
      'FUNC | onClickUpdateCount',
      'counter =>',
      this.counter(),
      '\nCOUNTERX2 =>',
      this.counterX2()
    );
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

  onClickUpdateSubject() {
    this.subject1.next(10);
    this.subject2.next(20);
    this.signal1.set(10);
    this.signal2.set(20);
  }

  onClickSumSignal(type: string) {
    if(type === 'signal1') {
      this.signal1.update((val) => val + 1);
    } else {
      this.signal2.update((val) => val + 1);
    }
  }
}
