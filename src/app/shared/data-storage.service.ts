import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { map, tap } from 'rxjs/operators';

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
    return this.http
      .get<Recipe[]>(
        'https://angular-practice-cheems-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((resData) => {
          return resData.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          }));
        }),
        tap((resData) => {
          console.log('data: ', resData);
          this.recipeService.setRecipes(resData);
        })
      );
  }
}

//take: get just one value, then unsubscribe
//when you dont want an ongoing subscription
//exhaustMap: wait for the first observable to complete,
// then return a new to replace the previous one
