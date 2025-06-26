import { afterNextRender, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, NgZone, OnDestroy, signal, ViewChild } from '@angular/core';
import {MatFormField, MatInputModule} from '@angular/material/input'
import {MatTableModule, MatTableDataSource} from '@angular/material/table'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { RecipesService } from '../../services/recipes.service';
import { Meal } from '../../models/meal.model';
import { SearchResultComponent } from '../../components/search-result/search-result.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { LoaderDirective } from '../../directives/loader.directive';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { WrapperComponent } from '../../components/wrapper/wrapper.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    // MatFormField, 
    // MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    SearchResultComponent,
    MatProgressSpinnerModule,
    LoaderDirective,
    // SidebarComponent,
    WrapperComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnDestroy {
  private recipesService = inject(RecipesService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone)

  searchTerm = '';
  isLoading: boolean = false;

  searchedItem = signal<string>('');

  constructor() {
    const term = localStorage.getItem('searchedItem');
    if (term) {
      this.searchedItem.set(term);
      this.searchTerm = term;
      this.searchMeal();
    }
  }

  updateSearch(term: string) {
    this.searchedItem.set(term);
    // localStorage.setItem('searchedItem', term);
  }
  destroy$ = new Subject<void>();

  searchMeal(){
    this.isLoading = true;

    this.ngZone.runOutsideAngular(() => 
      setTimeout(() => {
        this.recipesService.searchMealByName(this.searchTerm).pipe(takeUntil(this.destroy$)).subscribe({
          next: (meals) => {
          // You can do something with meals here if needed
          console.log('Search results:', meals);
          this.isLoading = false;  // done loading on success
          this.cdr.markForCheck(); // notify change detection (if OnPush)
        },
        error: (error) => {
          console.error('Search failed:', error);
          this.isLoading = false;  // done loading on error as well
          this.cdr.markForCheck();
        }
        });
      }, 3000)
    )
    console.log('Clicked!');
    this.updateSearch(this.searchTerm);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
