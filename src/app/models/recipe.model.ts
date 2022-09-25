import { Ingredient } from './ingredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(
    name: string,
    desc: string,
    image: string,
    ings: Ingredient[] = []
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = image;
    this.ingredients = ings;
  }
}

export interface IRecipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}
