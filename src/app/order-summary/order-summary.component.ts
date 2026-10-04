import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order, Taco } from '../order/order.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="w4-sr-only">Order Summary</h1>
    @if (order.tacos.length > 0) {
      <ul class="w4-summary-list">
        @for (taco of order.tacos; track taco.lineItemId; let i = $index) {
          <li class="w4-line-item">
            <div class="w4-item-heading">
              <strong>Item {{ i + 1 }}: {{ taco.name }}</strong>
              <button
                type="button"
                class="w4-btn w4-btn-secondary w4-btn-small"
                (click)="removeTaco(taco.lineItemId)"
                aria-label="Remove {{ taco.name }} from order"
              >
                Remove Taco
              </button>
            </div>

            <div class="w4-line-item-details">
              <div class="w4-detail-row">
                <span>Quantity:</span>
                <span>{{ taco.quantity }}x</span>
              </div>
              <div class="w4-detail-row">
                <span>Unit Price:</span>
                <span>{{
                  taco.price | currency: 'USD' : 'symbol' : '1.2-2'
                }}</span>
              </div>
              <div class="w4-detail-row">
                <span>Line Subtotal:</span>
                <span>{{
                  taco.price * (taco.quantity ?? 1)
                    | currency: 'USD' : 'symbol' : '1.2-2'
                }}</span>
              </div>

              @if (taco.noOnions || taco.noCilantro) {
                <div class="w4-customizations">
                  <span>Customizations:</span>
                  <ul class="w4-customization-list">
                    @if (taco.noOnions) {
                      <li>No onions</li>
                    }
                    @if (taco.noCilantro) {
                      <li>No cilantro</li>
                    }
                  </ul>
                </div>
              }
            </div>
          </li>
        }
      </ul>
      <div class="w4-summary-total">
        <span>Total:</span>
        <strong>{{ getTotal() | currency: 'USD' : 'symbol' : '1.2-2' }}</strong>
      </div>
    } @else {
      <div class="w4-empty-state">
        <p>No tacos added to the order yet.</p>
      </div>
    }
  `,
})
export class OrderSummaryComponent {
  @Input() order!: Order;
  @Output() tacoRemoved = new EventEmitter<number>();

  getTotal() {
    return this.order.tacos.reduce(
      (acc, taco) => acc + taco.price * (taco.quantity ?? 1),
      0,
    );
  }

  removeTaco(lineItemId: number | undefined) {
    if (lineItemId !== undefined) {
      this.tacoRemoved.emit(lineItemId);
    }
  }
}
