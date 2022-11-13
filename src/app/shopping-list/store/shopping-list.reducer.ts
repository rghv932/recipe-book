import { Ingrediant } from "../../shared/ingrediant.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State{
  ingrediants: Ingrediant[];
  editedIngrediant: Ingrediant;
  editedIngrediantIndex: number;
};

export interface AppState{
  shoppingList: State;
};

const initialState: State = {
  ingrediants: [
    new Ingrediant('Apples', 5),
    new Ingrediant('Tomatoes', 10),
  ],
  editedIngrediant: null,
  editedIngrediantIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
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
      const ingrediant = state.ingrediants[state.editedIngrediantIndex];
      const updatedIngrediant = {
        ...ingrediant,
        ...action.payload
      };
      const updatedIngrediants = [...state.ingrediants];
      updatedIngrediants[state.editedIngrediantIndex] = updatedIngrediant;

      return {
        ...state,
        ingrediants: updatedIngrediants,
        editedIngrediantIndex: -1,
        editedIngrediant: null
      };

    case ShoppingListActions.DELETE_INGREDIANT:
      return {
        ...state,
        ingrediants: state.ingrediants.filter((ig, igIndex) => {
          return igIndex !== state.editedIngrediantIndex;
        })
      };
    
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngrediantIndex: action.payload,
        editedIngrediant: {...state.ingrediants[action.payload]}
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngrediant: null,
        editedIngrediantIndex: -1
      };

    default:
      return state;
  }
}