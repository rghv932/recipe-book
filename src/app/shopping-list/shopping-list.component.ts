import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingrediant } from '../shared/ingrediant.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private iSubs: Subscription;
  ingrediants: Observable<{ ingrediants: Ingrediant[] }>;

  constructor(
    private shoppingService: ShoppingListService,
    private store: Store<{ shoppingList: { ingrediants: Ingrediant[] } }>
  ) {}

  ngOnInit(): void {
    this.ingrediants = this.store.select('shoppingList');
  }

  onEditShopping(index: number) {
    this.shoppingService.onShoppingEdit.next(index);
  }

  ngOnDestroy(): void {
    //this.iSubs.unsubscribe();
  }
}