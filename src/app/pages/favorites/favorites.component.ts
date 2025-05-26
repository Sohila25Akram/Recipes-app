import { afterNextRender, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, NgZone, signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RecipesService } from '../../services/recipes.service';
import { Meal } from '../../models/meal.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [MatTableModule, MatPaginatorModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {
  private ngZone = inject(NgZone)

  displayedColumns: string[] = ['strMealThumb', 'strMeal', 'strCategory', 'idMeal'];
  dataSource = new MatTableDataSource<Meal>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private recipesService = inject(RecipesService);
  // private cdr = inject(ChangeDetectorRef);
  // recipesInFavorite = signal<Meal[]>([])


   recipesInFavorite = computed(() => {
    const meals = this.recipesService.recipesAddedToFav();
    // this.cdr.markForCheck();
    return meals;
  });

    
  deleteFromFav(id: string){
    this.recipesService.removeFromFavourite(id)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() {
    effect(() => {
      const data = this.recipesInFavorite();
      
      this.ngZone.runOutsideAngular(() => 
        setTimeout(() => {
          this.dataSource.data = data;
        })
      )
    });

    

    // afterNextRender(() => {
    //   this.recipesInFavorite = computed(() => {
    //     const serviceFavorites = this.recipesService.recipesAddedToFav();
    //     const localStorageFavorites = localStorage.getItem('favoriteRecipes');

    //     const meals = serviceFavorites? serviceFavorites : localStorageFavorites
    //       ? JSON.parse(localStorageFavorites)
    //       : [];
    //     console.log('Favorite meals:', meals)
    //     return meals;
    //   })
    // })

    // afterNextRender(() => {
    //   this.recipesInFavorite.set(
    //     this.recipesService.recipesAddedToFav()
    //   )

    // })
  }
}
