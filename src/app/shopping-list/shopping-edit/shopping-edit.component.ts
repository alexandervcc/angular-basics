import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddItem(form: NgForm) {
    const { name, amount } = form.value;
    const ing = new Ingredient(name, amount);
    this.shoppingService.addIngredient(ing);
  }
}
