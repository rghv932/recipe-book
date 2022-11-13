import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingrediant } from '../../shared/ingrediant.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingSubscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingrediant;
  @ViewChild('f') form: NgForm;

  constructor(
    private shoppingService: ShoppingListService,
    private store: Store<{ shoppingList: { ingrediants: Ingrediant[] } }>
  ) {}

  ngOnInit(): void {
    this.shoppingSubscription = this.shoppingService.onShoppingEdit.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editedItem = this.shoppingService.getIngrediantByIndex(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onAdd(inputForm: NgForm) {
    const value = inputForm.value;
    const newIngrediant = new Ingrediant(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngrediant({
          index: this.editItemIndex,
          ingrediant: newIngrediant,
        })
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
  }

  onDelete() {
    this.onClear();
    this.store.dispatch(new ShoppingListActions.DeleteIngrediant(this.editItemIndex));
  }

  ngOnDestroy(): void {
    this.shoppingSubscription.unsubscribe();
  }
}