import { Action } from '@ngrx/store';

import { Ingrediant } from '../../shared/ingrediant.model';

export const ADD_INGREDIANT = 'ADD_INGREDIANT';
export const ADD_INGREDIANTS = 'ADD_INGREDIANTS';
export const UPDATE_INGREDIANT = 'UPDATE_INGREDIANT';
export const DELETE_INGREDIANT = 'DELETE_INGREDIANT';

export type ShoppingListActions =
  | AddIngrediant
  | AddIngrediants
  | UpdateIngrediant
  | DeleteIngrediant;

export class AddIngrediant implements Action {
  readonly type = ADD_INGREDIANT;

  constructor(public payload: Ingrediant) {}
}

export class AddIngrediants implements Action {
  readonly type = ADD_INGREDIANTS;

  constructor(public payload: Ingrediant[]) {}
}

export class UpdateIngrediant implements Action {
  readonly type = UPDATE_INGREDIANT;

  constructor(public payload: { index: number; ingrediant: Ingrediant }) {}
}

export class DeleteIngrediant implements Action {
  readonly type = DELETE_INGREDIANT;

  constructor(public payload: number) {}
}