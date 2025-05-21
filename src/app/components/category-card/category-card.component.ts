import { Component, Input } from '@angular/core';
import { Category } from '../../models/meal.model';
import { EllipsisTextPipe } from '../../pipes/ellipsis-text.pipe';

@Component({
  selector: 'app-category-card',
  imports: [EllipsisTextPipe],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {
  @Input() category!: Category
}
