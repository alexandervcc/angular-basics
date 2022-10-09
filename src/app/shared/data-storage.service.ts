import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

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
    //take: get just one value, then unsubscribe
    //when you dont want an ongoing subscription
    //exhaustMap: wait for the first observable to complete,
    // then return a new to replace the previous one
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const token = !!user.token ? user.token : 'NULL';
        console.log("rokwen: ",token)
        return this.http.get<Recipe[]>(
          'https://angular-practice-cheems-default-rtdb.firebaseio.com/recipes.json',
          {
            params: new HttpParams().set('auth', token),
          }
        );
      }),
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
