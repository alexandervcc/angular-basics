import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Mijotron',
      'XD',
      'https://image.shutterstock.com/image-photo/bank-blocks-linked-money-by-600w-1937886058.jpg'
    ),
    new Recipe(
      'Mijotron',
      'XD',
      'https://image.shutterstock.com/image-photo/bank-blocks-linked-money-by-600w-1937886058.jpg'
    )
  ];
  constructor() {}

  ngOnInit(): void {}
}
