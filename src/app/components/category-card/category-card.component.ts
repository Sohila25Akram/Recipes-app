import { Component, Input } from '@angular/core';
import { Category } from '../../models/meal.model';
import { EllipsisTextPipe } from '../../pipes/ellipsis-text.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-card',
  imports: [EllipsisTextPipe, RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {
  @Input() category!: Category
  @Input() fullDesc: boolean = false;
}
