import { Component, Input } from '@angular/core';
import { Meal } from '../../models/meal.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  imports: [RouterLink],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
  @Input() recipeItem!: Meal;
  @Input() path!: any;
}
