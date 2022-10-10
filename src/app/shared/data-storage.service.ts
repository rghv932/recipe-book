import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map,take,tap } from 'rxjs/operators';

import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

interface UserData{
  email:string;
  password:string;
}
@Injectable()
export class DataStorageService{
  

  constructor(private http:HttpClient,private recipeService:RecipeService){}

  storeRecipes(){
    const recipes=this.recipeService.getRecipes();
    this.http.put('https://ng-recipebook-a7141-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',recipes)
    .subscribe(response=>{
      console.log(response);
    });
  }

  fetchRecipes(){
      return this.http.get<Recipe[]>('https://ng-recipebook-a7141-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
      .pipe(
      map(recipes=>{
      return recipes.map(recipe=>{
        return {...recipe,ingrediants: recipe.ingrediants ? recipe.ingrediants : [] };
      });
    }),
    tap(recipes=>{
      this.recipeService.setRecipes(recipes);
    }));
  }

  public storeUserDate(email:string,password:string){
    const userData:UserData={
      email:email,
      password:password
    }
    this.http.post('https://ng-recipebook-a7141-default-rtdb.asia-southeast1.firebasedatabase.app/users.json',userData)
    .subscribe(response=>{
      console.log(response);
    });
  }

}