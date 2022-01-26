import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingrediant } from 'src/app/shared/ingrediant.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingSubscription:Subscription;
  editMode=false;
  editItemIndex:number;
  editedItem:Ingrediant;
  @ViewChild('f') form:NgForm;

  constructor(private shoppingService:ShoppingListService){}

  // @ViewChild('nameInput') nameInputRef:ElementRef;
  // @ViewChild('amountInput') amountInputRef:ElementRef;
  //@Output() ingrediant=new EventEmitter<Ingrediant>();
  

  ngOnInit(): void {
    this.shoppingSubscription=this.shoppingService.onShoppingEdit.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editItemIndex=index;
        this.editedItem=this.shoppingService.getIngrediantByIndex(index);
        this.form.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        });
      }
    );
  }

  onAdd(inputForm:NgForm){
    //const name=this.nameInputRef.nativeElement.value;
    //const amt=this.amountInputRef.nativeElement.value;
    const value=inputForm.value;
    const newIngrediant=new Ingrediant(value.name,value.amount);
    //this.ingrediant.emit(newIngrediant);
    if(this.editMode){
      this.shoppingService.updateIngrediant(this.editItemIndex,newIngrediant);
    }
    else{
      this.shoppingService.onAddIngrediant(newIngrediant);
    }
    this.editMode=false;
    this.form.reset();
  }

  onClear(){
    this.form.reset();
    this.editMode=false;
  }

  onDelete(){
    this.onClear();
    this.shoppingService.deleteIngrediant(this.editItemIndex);
  }

  ngOnDestroy(): void {
      this.shoppingSubscription.unsubscribe();
  }
}
