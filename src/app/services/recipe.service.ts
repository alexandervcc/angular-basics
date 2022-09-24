import { EventEmitter, Output } from '@angular/core';
import { Recipe } from '../models/recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Mijotron1',
      'XD1',
      'https://image.shutterstock.com/image-photo/bank-blocks-linked-money-by-600w-1937886058.jpg'
    ),
    new Recipe(
      'Mijotron2',
      'XD2',
      'https://image.shutterstock.com/image-photo/bank-blocks-linked-money-by-600w-1937886058.jpg'
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
