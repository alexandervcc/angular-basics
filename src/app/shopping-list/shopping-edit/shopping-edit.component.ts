import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form?: NgForm;
  private subscription?: Subscription;
  editMode = false;
  editedItemIndex?: number;
  editedItem?: Ingredient;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (num: number) => {
        this.editedItemIndex = num;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(num);
        this.form?.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    const { name, amount } = form.value;
    const ing = new Ingredient(name, amount);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex!!, ing);
    } else {
      this.shoppingService.addIngredient(ing);
    }
    this.resetForm();
  }

  onDelete() {
    this.shoppingService.removeIngredient(this.editedItemIndex!!);
    this.resetForm();
  }

  resetForm() {
    this.form?.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
