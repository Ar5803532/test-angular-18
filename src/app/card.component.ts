import {
  Component,
  effect,
  inject,
  Injector,
  input,
  Input,
  numberAttribute,
  OnInit,
  runInInjectionContext,
  signal,
} from '@angular/core';

@Component({
  selector: 'card-component',
  templateUrl: 'card.component.html',
  standalone: true,
})
export class CardComponent {
  @Input({ required: true, transform: numberAttribute }) dataInput!: number;

  injector = inject(Injector);

  multiplierSignal = signal(10);

  counterSignal = signal(6);

  // dataInput = input();

  // *REVIEW - Field initializer ** ถ้าไม่ทำแบบนี้ signal in ในไอพวกนั้นที่ if else หรือ บลาๆๆ is to do one tim
  //  ต้องเอา signal มาเก็บในตัวแปร ก่อน นะจ๊ะ เด็กดื้อ
  effectRef = effect((onCleanup) => {
    const cloneSignal = this.counterSignal();
    const timer = setTimeout(() => {
      console.log('timeout couterSignal', cloneSignal);
    }, 100);
    onCleanup(() => {
      clearTimeout(timer); 
      console.log('cleanUp');
    });
  });

  constructor() {}

  //   ngOnInit() {
  //     runInInjectionContext(this.injector, () => {
  //       effect(() => {
  //         console.log('newInput =>', this.dataInput);
  //         //   console.log('effect log in CardComponent =>', this.dataInput * this.multiplierSignal());
  //       });
  //     });
  //   }

  cleanUp() {
    this.effectRef.destroy();
  }

  onClickUpdateCounter() {
    this.counterSignal.update((counter) => counter * 2);
  }
}
