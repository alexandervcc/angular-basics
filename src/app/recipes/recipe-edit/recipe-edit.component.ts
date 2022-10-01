import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    imagePath: new FormControl(''),
    description: new FormControl(''),
    ingredients: new FormArray([]),
  });
  id?: number;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] !== undefined;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.form);
  }

  get controls() {
    return (this.form.get('ingredients') as FormArray).controls;
  }

  private initForm() {
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id!!);
      const arrayIngredients: any[] = [];
      if (recipe['ingredients']) {
        recipe.ingredients.forEach((ing) => {
          arrayIngredients.push(
            new FormGroup({
              name: new FormControl(ing.name),
              amount: new FormControl(ing.amount),
            })
          );
        });
      }

      const formIngredients = new FormArray(arrayIngredients);
      this.form = new FormGroup({
        name: new FormControl(recipe.name),
        imagePath: new FormControl(recipe.imagePath),
        description: new FormControl(recipe.description),
        ingredients: formIngredients,
      });
    }
  }
}
