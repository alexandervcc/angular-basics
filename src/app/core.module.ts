import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeResolverService } from './recipes/recipes-resolver.service';
import { ShoppingListService } from './services/shopping-list.service';

@NgModule({
  providers: [
    RecipeResolverService,
    ShoppingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}

/*
  - when creating module for services, services are NEVER required to be exported
  - this are automatically injected
*/