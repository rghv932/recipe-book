import { Ingrediant } from "../../shared/ingrediant.model";
import * as ShoppingListActions from "./shopping-list.actions";

const initialState = {
  ingrediants: [
    new Ingrediant('Apples', 5),
    new Ingrediant('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch(action.type){

    case ShoppingListActions.ADD_INGREDIANT:
      return {
        ...state,
        ingrediants:[...state.ingrediants, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIANTS:
      return {
        ...state,
        ingrediants:[...state.ingrediants, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIANT:
      const ingrediant = state.ingrediants[action.payload.index];
      const updatedIngrediant = {
        ...ingrediant,
        ...action.payload.ingrediant
      };
      const updatedIngrediants = [...state.ingrediants];
      updatedIngrediants[action.payload.index] = updatedIngrediant;

      return {
        ...state,
        ingrediants: updatedIngrediants
      };

    case ShoppingListActions.DELETE_INGREDIANT:
      return {
        ...state,
        ingrediants: state.ingrediants.filter((ig, igIndex) => {
          return igIndex !== action.payload;
        })
      };

    default:
      return state;
  }
}