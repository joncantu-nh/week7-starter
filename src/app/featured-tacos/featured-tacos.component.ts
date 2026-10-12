import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

interface FeaturedTaco {
  name: string;
  description: string;
  price: number;
  label: 'Spicy' | 'Popular' | 'New' | 'Classic';
  isChefsPick: boolean;
}

@Component({
  selector: 'app-featured-tacos',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <section class="featured-tacos-container">
      <h2>Featured Tacos</h2>

      <div class="taco-list">
        @for (taco of featuredTacos; track taco.name) {
          <article class="taco-card">
            <div class="taco-header">
              <h3>{{ taco.name }}</h3>
              <span class="taco-label">
                {{ taco.label }}
              </span>
            </div>

            <p class="taco-description">
              {{ taco.description }}
            </p>

            <div class="taco-footer">
              <span class="taco-price">
                {{ taco.price | currency }}
              </span>

              @if (taco.isChefsPick) {
                <div class="chefs-pick">
                  Chef's Pick!
                </div>
              }
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class FeaturedTacosComponent {
  readonly featuredTacos: FeaturedTaco[] = [
    {
      name: 'Carne Asada',
      description: 'Grilled steak with fresh cilantro and onions',
      price: 4.99,
      label: 'Popular',
      isChefsPick: false,
    },
    {
      name: 'Ghost Pepper Carnitas',
      description:
        'Slow-cooked pork with ghost peppers - not for the faint of heart',
      price: 5.49,
      label: 'Spicy',
      isChefsPick: true,
    },
    {
      name: 'Baja Fish',
      description:
        'Crispy beer-battered cod with cabbage slaw and lime crema',
      price: 6.25,
      label: 'New',
      isChefsPick: false,
    },
    {
      name: 'Al Pastor',
      description:
        'Marinated pork with pineapple and traditional spices',
      price: 4.75,
      label: 'Classic',
      isChefsPick: false,
    },
    {
      name: 'Mushroom & Poblano',
      description:
        'Roasted mushrooms and poblano peppers with queso fresco',
      price: 5.99,
      label: 'New',
      isChefsPick: false,
    },
  ];
}

