import { Component, computed, inject } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private recipesService  = inject(RecipesService);
  private router = inject(Router);

  categoriesList = computed(() => {
    return this.recipesService.categoriesList();
  })

  searchTerm: string = '';

  goToSearch(){
    //  this.recipesService.searchMealByName(this.searchTerm);

    this.router.navigate(['/search'], {
      queryParams: {
        searchTerm: this.searchTerm
      }
    });
  }

}
