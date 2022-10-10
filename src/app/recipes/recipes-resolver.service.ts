import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length !== 0) {
      return recipes;
    }
    return this.dataStorageService.getRecipes();
  }
}
