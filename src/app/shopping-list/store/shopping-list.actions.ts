import { Action } from '@ngrx/store';

import { Ingrediant } from '../../shared/ingrediant.model';

export const ADD_INGREDIANT = 'ADD_INGREDIANT';
export const ADD_INGREDIANTS = 'ADD_INGREDIANTS';
export const UPDATE_INGREDIANT = 'UPDATE_INGREDIANT';
export const DELETE_INGREDIANT = 'DELETE_INGREDIANT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

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

  constructor(public payload: Ingrediant) {}
}

export class DeleteIngrediant implements Action {
  readonly type = DELETE_INGREDIANT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions =
  | AddIngrediant
  | AddIngrediants
  | UpdateIngrediant
  | DeleteIngrediant
  | StartEdit
  | StopEdit;