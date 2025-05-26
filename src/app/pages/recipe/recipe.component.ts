import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { Meal } from '../../models/meal.model';
import { Observable } from 'rxjs';
import { WrapperComponent } from '../../components/wrapper/wrapper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-recipe',
  imports: [WrapperComponent, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  private recipesService = inject(RecipesService);

  recipe = computed(() => {
    return this.recipesService.singleMeal();
  });

  // dataSource = new MatTableDataSource<{ingredient: string, measure: string}>();

  // currentMealId : string = '52912';
  currentMealId!: string;
  // currentRecipe$!: Observable<Meal>;

  ingredients = signal<string[]>([]);
  measures = signal<string[]>([]);

  ngOnInit() {
    const supscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const id = paramMap.get('id');
        if (id) {
          this.currentMealId = id;
        }
      },
    });
    this.destroyRef.onDestroy(() => supscription.unsubscribe());

    this.recipesService.getRecipeDetails(this.currentMealId);

    //  this.dataSource.data = this.ingredients.map((ingredient, index) => ({
    //   ingredient,
    //   measure: this.measures[index],
    // }));

    // this.currentRecipe$ = this.recipesService.getRecipeDetails(this.currentMealId);
  }

  constructor() {
    effect(() => {
      const newIngredients: string[] = [];
      const newMeasures: string[] = [];

      const currentRecipe = this.recipe();

      for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}` as keyof Meal;
        const measureKey = `strMeasure${i}` as keyof Meal;

        const ingredient = currentRecipe[ingredientKey];
        const measure = currentRecipe[measureKey];

        if (ingredient && ingredient !== '') {
          newIngredients.push(ingredient);
          newMeasures.push(measure ?? '');
        }
      }

      this.ingredients.set(newIngredients);
      this.measures.set(newMeasures);

      // console.log(this.ingredients());
    });
  }

  displayedColumns: string[] = ['ingredient', 'measure'];
  // dataSource = signal<PeriodicElement[]>([]);

  dataSource = computed(() =>
    this.ingredients().map((ingredient, index) => ({
      ingredient,
      measure: this.measures()[index] ?? '',
    }))
  );

  // constructor() {
  // effect(() => {
  //   for (let i = 0; i < 20; i++) {
  //     if (this.ingredients[i] && this.ingredients[i].trim() !== '') {
  //       this.dataSource.push({
  //         ingredient: this.ingredients[i],
  //         measure: this.measures[i] ?? ''
  //       });
  //     }
  //   }
  // this.dataSource = [
  //   {ingredient: this.recipe().strIngredient1, measure: 'He'},
  //   {ingredient: 'Lithium', measure: 'Li'},
  //   {ingredient: 'Beryllium', measure: 'Be'},
  //   {ingredient: 'Boron', measure: 'B'},
  //   {ingredient: 'Carbon',  measure: 'C'},
  //   {ingredient: 'Nitrogen',  measure: 'N'},
  //   {ingredient: 'Oxygen',  measure: 'O'},
  //   {ingredient: 'Fluorine',  measure: 'F'},
  //   { ingredient: 'Neon',  measure: 'Ne'},
  // ];
  // })
  // }

  addToFav() {
    if (this.currentMealId) {
      this.recipesService.addToFavourite(this.currentMealId);
    }
    console.log('click add to fav');
  }
}

// export interface PeriodicElement {
//   ingredient: string;
//   measure: string;
// }
