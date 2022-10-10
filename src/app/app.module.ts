import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from './services/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { RecipesModule } from './recipes/Recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, AuthComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    CoreModule
  ],
  providers: [
    RecipeService,
    DataStorageService,
    
  ],
  bootstrap: [AppComponent],
  //entryComponents: [AlertComponent],
})
export class AppModule {}

/*
  - here the interceptos is added with an special configuration

  - entryComponents:
    - components that will be created without selectors
    - this can be omitted if Angular ver>=9
   
  - at imports: add the custom modules

  - coreModule: one containing services, MUST be at declarations, not Providers
*/
