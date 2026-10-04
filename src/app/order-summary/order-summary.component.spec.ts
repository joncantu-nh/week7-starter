import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryComponent } from './order-summary.component';
import { Order } from '../order/order.component';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('order', {
      orderId: 999,
      tacos: [
        {
          id: 3,
          lineItemId: 1,
          name: 'Al Pastor',
          price: 2.5,
          quantity: 2,
        },
        {
          id: 1,
          lineItemId: 2,
          name: 'Carnitas',
          price: 3,
          quantity: 1,
          noOnions: true,
        },
      ],
    } as Order);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total price correctly', () => {
    const mockOrder: Order = {
      orderId: 1000,
      tacos: [
        {
          id: 1,
          lineItemId: 1,
          name: 'Carnitas',
          price: 3,
          quantity: 2,
        },
        {
          id: 3,
          lineItemId: 2,
          name: 'Al Pastor',
          price: 2.5,
          quantity: 1,
        },
      ],
    };

    fixture.componentRef.setInput('order', mockOrder);
    fixture.detectChanges();

    expect(component.getTotal()).toEqual(8.5);
  });

  it('should display message for empty order', () => {
    fixture.componentRef.setInput('order', {
      orderId: 1001,
      tacos: [],
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const emptyState = compiled.querySelector('.w4-empty-state');

    expect(emptyState?.textContent).toContain(
      'No tacos added to the order yet.',
    );
  });

  it('should display details for each taco in the order', () => {
    const mockOrder: Order = {
      orderId: 1002,
      tacos: [
        {
          id: 1,
          lineItemId: 1,
          name: 'Carnitas',
          price: 3,
          quantity: 2,
        },
        {
          id: 3,
          lineItemId: 2,
          name: 'Al Pastor',
          price: 2.5,
          quantity: 1,
        },
      ],
    };

    fixture.componentRef.setInput('order', mockOrder);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.w4-line-item');

    expect(items.length).toBe(2);

    expect(items[0].textContent).toContain('Item 1: Carnitas');
    expect(items[0].textContent).toContain('Quantity:');
    expect(items[0].textContent).toContain('2x');
    expect(items[0].textContent).toContain('Unit Price:');
    expect(items[0].textContent).toContain('$3.00');
    expect(items[0].textContent).toContain('Line Subtotal:');
    expect(items[0].textContent).toContain('$6.00');

    expect(items[1].textContent).toContain('Item 2: Al Pastor');
    expect(items[1].textContent).toContain('1x');
    expect(items[1].textContent).toContain('$2.50');
  });

  it('should calculate the total using taco quantity values', () => {
    const order: Order = {
      orderId: 2001,
      tacos: [
        {
          id: 1,
          lineItemId: 1,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 2,
        },
        {
          id: 2,
          lineItemId: 2,
          name: 'Queso Birria Taco',
          price: 3.5,
          quantity: 3,
        },
      ],
    };

    fixture.componentRef.setInput('order', order);
    fixture.detectChanges();

    expect(component.getTotal()).toBe(17.0);
  });

  it('should render the first taco using the approved line-item format', () => {
    fixture.componentRef.setInput('order', {
      orderId: 2002,
      tacos: [
        {
          id: 1,
          lineItemId: 1,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 2,
        },
      ],
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const firstItem = compiled.querySelector('.w4-line-item');

    expect(firstItem?.textContent).toContain('Item 1: Carnitas Taco');
    expect(firstItem?.textContent).toContain('Quantity:');
    expect(firstItem?.textContent).toContain('2x');
  });

  it('should use generated item labels instead of legacy quantity-first formatting', () => {
    fixture.componentRef.setInput('order', {
      orderId: 3001,
      tacos: [
        {
          id: 1,
          lineItemId: 1,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 2,
        },
      ],
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const firstItem = compiled.querySelector('.w4-line-item');

    expect(firstItem?.textContent).toContain('Item 1: Carnitas Taco');
    expect(firstItem?.textContent).toContain('Quantity:');
    expect(firstItem?.textContent).toContain('2x');
  });

  it('should display unit price and line subtotal', () => {
    fixture.componentRef.setInput('order', {
      orderId: 3002,
      tacos: [
        {
          id: 1,
          lineItemId: 1,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 2,
        },
      ],
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const text =
      compiled.querySelector('.w4-line-item')?.textContent ?? '';

    expect(text).toContain('Unit Price:');
    expect(text).toContain('$3.25');
    expect(text).toContain('Line Subtotal:');
    expect(text).toContain('$6.50');
  });

  it('should render a Remove Taco button for each order line', () => {
    fixture.componentRef.setInput('order', {
      orderId: 3003,
      tacos: [
        {
          id: 1,
          lineItemId: 1,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 1,
        },
        {
          id: 3,
          lineItemId: 2,
          name: 'Al Pastor Taco',
          price: 3.25,
          quantity: 1,
        },
      ],
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');

    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Remove Taco');
    expect(buttons[1].textContent).toContain('Remove Taco');
  });

  it('should display generated item identifiers for order lines', () => {
    fixture.componentRef.setInput('order', {
      orderId: 3004,
      tacos: [
        {
          id: 1,
          lineItemId: 1,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 1,
        },
        {
          id: 2,
          lineItemId: 2,
          name: 'Queso Birria Taco',
          price: 3.5,
          quantity: 1,
        },
      ],
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const listText =
      compiled.querySelector('.w4-summary-list')?.textContent ?? '';

    expect(listText).toContain('Item 1');
    expect(listText).toContain('Item 2');
  });

  it('should emit the unique line item id when Remove Taco is clicked', () => {
    fixture.componentRef.setInput('order', {
      orderId: 3005,
      tacos: [
        {
          id: 1,
          lineItemId: 101,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 1,
        },
      ],
    });

    spyOn(component.tacoRemoved, 'emit');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const removeButton = compiled.querySelector(
      'button',
    ) as HTMLButtonElement;

    removeButton.click();

    expect(component.tacoRemoved.emit).toHaveBeenCalledWith(101);
  });
});
