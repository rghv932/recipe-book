import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthService } from './auth/auth.service';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';

@NgModule({
  providers: [
    RecipeService,
    DataStorageService,
    RecipeResolverService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}