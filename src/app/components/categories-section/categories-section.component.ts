import { Component, computed, inject, signal } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { EllipsisTextPipe } from '../../pipes/ellipsis-text.pipe';

@Component({
  selector: 'app-categories-section',
  imports: [EllipsisTextPipe],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.scss'
})
export class CategoriesSectionComponent {
 private recipesService = inject(RecipesService);
  currentCategoryName = signal<string>('Dessert');

  categoriesList = computed(() => {
    return this.recipesService.categoriesList().reverse();
  })

  setCurrentCategory(categoryName: string){
    this.currentCategoryName.set(categoryName);
  }

  currentCategory = computed(() => {
    return this.recipesService.categoriesList().find(r => r.strCategory === this.currentCategoryName())!
  })

}
