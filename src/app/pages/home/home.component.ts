import { AfterViewInit, Component, computed, DestroyRef, effect, ElementRef, inject, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { WrapperComponent } from '../../components/wrapper/wrapper.component';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { RecipesService } from '../../services/recipes.service';
import { Meal } from '../../models/meal.model';
import { map, take } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [WrapperComponent, RecipeItemComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  private recipesService = inject(RecipesService);
  private destroyRef = inject(DestroyRef);


    private categoryRecipes = signal(new Map<string, Meal[]>());


// @ViewChild('categoryTitle') categoryEL! : ElementRef;

  // loadedCategoryRecipes = signal<Meal[]>([]);
  // category!: string;
  // loadedCategoryRecipes: any;
  allCategories= computed(() => {
    return this.recipesService.categoriesList();

  })

  // ngOnInit(): void {
  //   this.recipesService.recipesOfCategory()
  // }

  constructor() {
    effect(() => {
      const categories = this.allCategories();
      categories.forEach((cat) => {
        const categoryName = cat.strCategory;
        if (!this.categoryRecipes().has(categoryName)) {
          const supscription = this.recipesService.getSexRecipesOfCategory(categoryName)
          .pipe(
            map(meals => meals.slice(0, 5)) // take first 6 recipes from the response
          )
          .subscribe((meals) => {
            const updatedMap = new Map(this.categoryRecipes());
            updatedMap.set(categoryName, meals);
            this.categoryRecipes.set(updatedMap);
          });
          this.destroyRef.onDestroy(() => supscription.unsubscribe())
          
        }
      });
    });
  }

  getRecipes(categoryName: string){
    return this.categoryRecipes().get(categoryName) || [];
  }
  
}
