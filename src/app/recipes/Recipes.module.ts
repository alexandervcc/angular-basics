import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
  ]
})
export class RecipesModule {}

/*
  - Configuration for a new module:
    - declaration: all recipe related components
    - export: to export the component to be used into the main module

  - some modules like http, forms are added into the global module, so those are invisible
    to the custom modules, if these are not added explicitly
  - once all dependecies are added the module is ready to be used

  - when requiring the directives: *ngIf & *ngFor, it is required that
    the module to be added MUST be CommonModule, not 'BrowserModule'

  - the custom module should have the custom RoutingModule, and is not necessary to
    add again into the routing-app module
      - the submodule also has to have the Components used in the sub-route module

  - if the routing is embedded into the module, now is not necesary to export the 
    components anymore, as these are not used outside this file

*/
