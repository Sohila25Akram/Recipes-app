import { Component, computed, inject } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private recipesService  = inject(RecipesService);

  categoriesList = computed(() => {
    return this.recipesService.categoriesList();
  })
}
