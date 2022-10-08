import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Mijotron1',
      'XD1',
      'https://image.shutterstock.com/image-photo/bank-blocks-linked-money-by-600w-1937886058.jpg',
      [new Ingredient('Bigote', 1)]
    ),
    new Recipe(
      'Manaseses',
      'XD2',
      'https://image.shutterstock.com/image-photo/bank-blocks-linked-money-by-600w-1937886058.jpg',
      [new Ingredient('Pelo', 1), new Ingredient('Orejas', 2)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredient[] = []) {
    this.slService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addNewRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteById(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
