import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedTacosComponent } from './featured-tacos.component';

describe('FeaturedTacosComponent', () => {
  let component: FeaturedTacosComponent;
  let fixture: ComponentFixture<FeaturedTacosComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedTacosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedTacosComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should render at least four featured tacos', () => {
    const tacoCards = compiled.querySelectorAll('.taco-card');

    expect(tacoCards.length).toBeGreaterThanOrEqual(4);
  });

  it('should render taco name, price, and featured label', () => {
    const firstTaco = component.featuredTacos[0];
    const firstCard = compiled.querySelector(
      '.taco-card',
    ) as HTMLElement;

    expect(firstCard.textContent).toContain(firstTaco.name);
    expect(firstCard.textContent).toContain('$4.99');
    expect(firstCard.textContent).toContain(firstTaco.label);
  });

  it('should display exactly one Chef\'s Pick', () => {
    const chefsPickElements =
      compiled.querySelectorAll('.chefs-pick');

    const chefsPickTacos =
      component.featuredTacos.filter(
        taco => taco.isChefsPick,
      );

    expect(chefsPickElements.length).toBe(1);
    expect(chefsPickTacos.length).toBe(1);
    expect(
      chefsPickElements[0].textContent,
    ).toContain("Chef's Pick");
  });
});
