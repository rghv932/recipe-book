import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingrediant } from '../../shared/ingrediant.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingSubscription: Subscription;
  editMode = false;
  editedItem: Ingrediant;
  @ViewChild('f') form: NgForm;

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.shoppingSubscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngrediantIndex > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngrediant;
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onAdd(inputForm: NgForm) {
    const value = inputForm.value;
    const newIngrediant = new Ingrediant(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngrediant(newIngrediant)
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngrediant(newIngrediant));
    }
    this.editMode = false;
    this.form.reset();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    this.onClear();
    this.store.dispatch(new ShoppingListActions.DeleteIngrediant());
  }

  ngOnDestroy(): void {
    this.shoppingSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}