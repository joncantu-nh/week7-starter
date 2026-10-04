import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a selected taco to the order with correct customization', () => {
    component.selectedTacoId = 1;
    component.noOnions = true;
    component.noCilantro = false;
    component.quantity = 2;
    component.addToOrder();
    const addedTaco = component.order.tacos[0];

    expect(addedTaco.id).toBe(1);
    expect(addedTaco.quantity).toBe(2);
    expect(addedTaco.noOnions).toBe(true);
    expect(addedTaco.noCilantro).toBe(false);
  });

  /*
  it('should calculate the total price correctly for multiple tacos', () => {
    component.order.tacos = [
      { id: 1, name: 'Taco1', price: 5, quantity: 2},
      { id: 2, name: 'Taco2', price: 6.5, quantity: 3}
    ]

    const totalPrice = component.getTotal();
    expect(totalPrice).toBe(29.5);
  });
  */

  it('should reset all form fields to their default values after resetForm is called', () => {
    component.selectedTacoId = 2;
    component.quantity = 3;
    component.noOnions = true;
    component.noCilantro = true;

    component.resetForm();

    expect(component.selectedTacoId).toBe(1);
    expect(component.quantity).toBe(1);
    expect(component.noOnions).toBe(false);
    expect(component.noCilantro).toBe(false);
  });

  it('should still reset form values after adding a taco to the order', () => {
    component.selectedTacoId = 3;
    component.quantity = 4;
    component.noOnions = true;
    component.noCilantro = true;

    component.addToOrder();

    expect(component.selectedTacoId).toBe(1);
    expect(component.quantity).toBe(1);
    expect(component.noOnions).toBe(false);
    expect(component.noCilantro).toBe(false);
  });

  it('should remove only the selected order line when taco types are duplicated', () => {
    component.order = {
      orderId: 5001,
      tacos: [
        {
          id: 1,
          lineItemId: 1,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 1,
          noOnions: true,
        },
        {
          id: 1,
          lineItemId: 2,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 3,
          noOnions: true,
        },
        {
          id: 5,
          lineItemId: 3,
          name: 'Chicken Taco',
          price: 3.25,
          quantity: 2,
        },
      ],
    };

    component.onTacoRemoved(1);

    expect(component.order.tacos.length).toBe(2);
    expect(
      component.order.tacos.some((taco) => taco.lineItemId === 1),
    ).toBeFalse();
    expect(
      component.order.tacos.some((taco) => taco.lineItemId === 2),
    ).toBeTrue();
    expect(
      component.order.tacos.some((taco) => taco.lineItemId === 3),
    ).toBeTrue();
  });
});
