import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Mijotron1',
      'XD1',
      'https://image.shutterstock.com/image-photo/bank-blocks-linked-money-by-600w-1937886058.jpg'
    ),
    new Recipe(
      'Mijotron2',
      'XD2',
      'https://image.shutterstock.com/image-photo/bank-blocks-linked-money-by-600w-1937886058.jpg'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}

  onRecipeSelected(recipeElement: Recipe) {
    this.recipeWasSelected.emit(recipeElement);
  }
}
