import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://angular-practice-cheems-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((res) => {
        console.log('HeaderComp: ', res);
      });
  }

  getRecipes() {
    this.http
      .get<Recipe[]>(
        'https://angular-practice-cheems-default-rtdb.firebaseio.com/recipes.json'
      )
      .subscribe((res) => {
        console.log('HeaderComp:', res);
        this.recipeService.setRecipes(res);
      });
  }
}
