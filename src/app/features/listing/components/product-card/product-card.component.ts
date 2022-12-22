import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

// local imports
import { BaseComponent } from '@core/abstracts/base-component.abstract';
import { IProduct } from '@models/product.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent extends BaseComponent {
  @Input() product!: IProduct;

  @Output() selectProduct: EventEmitter<IProduct | null> =
    new EventEmitter<any>();

  constructor() {
    super();
  }

  toggleProduct() {
    if (!this.product.selected) {
      this.selectProduct.emit(this.product);
    }
  }
}
