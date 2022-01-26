import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingrediant } from '../shared/ingrediant.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  private iSubs:Subscription;
  ingrediants:Ingrediant[];

  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingrediants=this.shoppingService.getIngrediants();
    this.iSubs=this.shoppingService.ingrediantsChanged.subscribe(
      (ingrediants:Ingrediant[])=>{
        this.ingrediants=ingrediants;
      }
    );
  }

  onEditShopping(index:number){
    this.shoppingService.onShoppingEdit.next(index);
  }

  ngOnDestroy(): void {
      this.iSubs.unsubscribe();
  }
}
