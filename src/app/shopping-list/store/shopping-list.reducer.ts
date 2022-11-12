import { Ingrediant } from "../../shared/ingrediant.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingrediants: [
    new Ingrediant('Apples', 5),
    new Ingrediant('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngrediant) {
  switch(action.type){
    case ShoppingListActions.ADD_INGREDIANT:
      return {
        ...state,
        ingrediants:[...state.ingrediants, action.payload]
      };
    default:
      return state;
  }
}