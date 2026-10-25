import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { WrapperComponent } from '../../components/wrapper/wrapper.component';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Meal } from '../../models/meal.model';

@Component({
  selector: 'app-category-recipes',
  imports: [WrapperComponent, CategoryCardComponent, RecipeItemComponent, ScrollingModule],
  templateUrl: './category-recipes.component.html',
  styleUrl: './category-recipes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryRecipesComponent implements OnInit{
  private activatedRoute = inject(ActivatedRoute);
  private recipesService = inject(RecipesService);
  private destroyRef = inject(DestroyRef);

  currentCategoryName = signal('');

  ngOnInit() {
    const supscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const categoryName = paramMap.get('categoryName');
        if (categoryName) {
          this.currentCategoryName.set(categoryName);
          this.recipesService.getRecipesOfCategory(categoryName);
        }
      },
    });
    this.destroyRef.onDestroy(() => supscription.unsubscribe());
  }

  currentCategory = computed(() => {
    const categoryName = this.currentCategoryName();
    return this.recipesService.categoriesList().find(r => r.strCategory === categoryName)!
  })

  recipesOfCurrentCategory = computed(() => 
    this.recipesService.recipesOfCategory()
  )

  trackById(index: number, item: Meal): string {
    return item.idMeal;
  }
}
