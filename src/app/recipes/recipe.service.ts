import { Injectable } from "@angular/core";

import { Subject } from "rxjs";
import { Store } from "@ngrx/store";

import { Ingrediant } from "../shared/ingrediant.model";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService{

  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe','test','https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',[new Ingrediant('tomato',2),new Ingrediant('potato',3)]),
    new Recipe('Chinese Noodles','Just a delicious one!!','https://i1.wp.com/pixahive.com/wp-content/uploads/2020/09/Chinese-Noodles-25786-pixahive.jpg?fit=778%2C1151&ssl=1',[new Ingrediant('Spaghetti',5),new Ingrediant('Carrot',10)])
  ];
  constructor(private store: Store<fromShoppingList.AppState>){}

  getRecipes = () => this.recipes.slice();

  getRecipeById(id:number){
    return this.recipes[id];
  }
  
  addIngrediantsToShopping(ingrediants:Ingrediant[]){
    this.store.dispatch(new ShoppingListActions.AddIngrediants(ingrediants));
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(id:number,newRecipe:Recipe){
    this.recipes[id]=newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(id:number){
    this.recipes.splice(id,1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(newRecipes:Recipe[]){
    this.recipes=newRecipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}