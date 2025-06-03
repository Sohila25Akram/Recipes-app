import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meal } from '../../models/meal.model';
import { EllipsisTextPipe } from '../../pipes/ellipsis-text.pipe';

@Component({
  selector: 'app-searched-item',
  imports: [RouterLink, EllipsisTextPipe],
  templateUrl: './searched-item.component.html',
  styleUrl: './searched-item.component.scss'
})
export class SearchedItemComponent {
  @Input() recipeItem!: Meal;
}
