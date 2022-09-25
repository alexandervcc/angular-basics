import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef?: ElementRef;
  @ViewChild('amountInput') amountInputRef?: ElementRef;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddItem() {
    const ing = new Ingredient(
      this.nameInputRef?.nativeElement.value,
      this.amountInputRef?.nativeElement.value
    );
    this.shoppingService.addIngredient(ing);
  }
}
