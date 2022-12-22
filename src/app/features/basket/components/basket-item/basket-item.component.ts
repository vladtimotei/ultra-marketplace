import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

// local imports
import { BaseComponent } from '@core/abstracts/base-component.abstract';
import { IProduct } from '@models/product.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent extends BaseComponent {
  @Input() product!: IProduct;

  @Output() removeProduct: EventEmitter<IProduct | null> =
    new EventEmitter<any>();

  constructor() {
    super();
  }


  removeItem() {
    this.removeProduct.emit(this.product);
  }
}
