import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    imagePath: new FormControl(''),
    description: new FormControl(''),
    ingredients: new FormArray([]),
  });
  id?: number;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] !== undefined;
      this.initForm();
    });
  }

  onSubmit() {
    const { name, description, imagePath, ingredients } = this.form.value;
    const recipe = new Recipe(name, description, imagePath, ingredients);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id!!, recipe);
    } else {
      this.recipeService.addNewRecipe(recipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (this.form.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(i: number) {
    (this.form.get('ingredients') as FormArray).removeAt(i);
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
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        });
      }

      const formIngredients = new FormArray(arrayIngredients);
      this.form = new FormGroup({
        name: new FormControl(recipe.name, Validators.required),
        imagePath: new FormControl(recipe.imagePath, Validators.required),
        description: new FormControl(recipe.description, Validators.required),
        ingredients: formIngredients,
      });
    }
  }
}
