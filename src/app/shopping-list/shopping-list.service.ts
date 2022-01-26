
import { Subject } from "rxjs";
import { Ingrediant } from "../shared/ingrediant.model";

export class ShoppingListService{
  ingrediantsChanged=new Subject<Ingrediant[]>();
  onShoppingEdit=new Subject<number>();
  private ingrediants:Ingrediant[]=[
    new Ingrediant('Apples',5),
    new Ingrediant('Orange',10)
  ];

  getIngrediants=()=>this.ingrediants.slice();

  getIngrediantByIndex(x:number){
    return this.ingrediants[x];
  }

  onAddIngrediant(ingrediant:Ingrediant){
    this.ingrediants.push(ingrediant);
    this.ingrediantsChanged.next(this.ingrediants);
  }

  addIngrediants(ingrediants:Ingrediant[]){
    this.ingrediants.push(...ingrediants);
    this.ingrediantsChanged.next(this.ingrediants.slice());
  }

  updateIngrediant(index:number,newIngrediant:Ingrediant){
    this.ingrediants[index]=newIngrediant;
    this.ingrediantsChanged.next(this.ingrediants.slice());
  }

  deleteIngrediant(id:number){
    this.ingrediants.splice(id,1);
    this.ingrediantsChanged.next(this.ingrediants.slice());
  }
}