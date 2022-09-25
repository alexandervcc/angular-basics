import { EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

export class ShoppingListService {
  ingredientsChange = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Onion', 11),
    new Ingredient('Pineapple', 7),
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.emit(this.ingredients.slice());
  }

  addIngredients(il: Ingredient[]) {
    this.ingredients.push(...il);
    this.ingredientsChange.emit(this.ingredients.slice());
  }
}
