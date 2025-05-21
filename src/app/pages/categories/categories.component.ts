import { Component, computed, inject } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';

@Component({
  selector: 'app-categories',
  imports: [CategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private recipesService = inject(RecipesService);

  categoriesList = computed(() => {
    return this.recipesService.categoriesList()
  })
}
