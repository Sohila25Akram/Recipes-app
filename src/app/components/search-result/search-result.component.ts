import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RecipesService } from '../../services/recipes.service';
import { Meal } from '../../models/meal.model';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { SearchedItemComponent } from '../searched-item/searched-item.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    MatPaginatorModule,
    CommonModule,
    SearchedItemComponent
    // AsyncPipe
    // MatIconModule
  ],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent{
  private recipesService = inject(RecipesService);
  private cdr = inject(ChangeDetectorRef)

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Computed property for searched items
  searchedItems = computed(() => {
    const meals = this.recipesService.searchedMeals();
    // console.log('Searched Meals:', meals);
    //  this.cdr.markForCheck();
    return meals;
  });

  // searchedItems: Observable<Meal[]> = of([]);
  // currentLength: number = 0;

  // ngOnInit(): void {
  //   this.searchedItems = of(this.recipesService.searchedMeals());
  //   this.searchedItems.pipe(map(items => 
  //     this.currentLength = items.length
  //   ))
  //   // this.currentLength = return this.searchedItems.pipe(map(items => items.length))
  // }
  

  // Variables for pagination
  currentPage = 0;
  pageSize = 3;

  // Method to handle page changes
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  // Getter for paginated items
  
  get paginatedItems() {
    const startIndex = this.currentPage * this.pageSize;
    // return this.searchedItems.pipe(map(items => items.slice(startIndex, startIndex + this.pageSize)));
        return this.searchedItems().slice(startIndex, startIndex + this.pageSize);

  }
}
