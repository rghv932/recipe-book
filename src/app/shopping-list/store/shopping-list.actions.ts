import { Action } from '@ngrx/store';

import { Ingrediant } from '../../shared/ingrediant.model';

export const ADD_INGREDIANT = 'ADD_INGREDIANT';

export class AddIngrediant implements Action{
  readonly type = ADD_INGREDIANT;
  
  constructor(public payload: Ingrediant){}
}