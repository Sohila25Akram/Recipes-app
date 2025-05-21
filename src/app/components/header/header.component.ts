import { afterNextRender, Component, ElementRef, EventEmitter, inject, input, Input, output, Output, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipesService } from '../../services/recipes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule, 
    // MatFormField, 
    // MatInputModule, 
    CommonModule, 
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  private recipesService = inject(RecipesService);
  private router = inject(Router);
  // @ViewChild('favoriteBtn') favorite!: ElementRef<HTMLButtonElement>;

  // @Input() toggleDrawer!: () => void;
  // @Input() isOpen!: boolean;

  searchTerm = '';

  isOpen: boolean = false;
  @Output() toggleDrawer = new EventEmitter<boolean>()

  onToggle(){
    this.isOpen = !this.isOpen;
    this.toggleDrawer.emit();
  }


  // onToggle() {
  //   this.toggleDrawer();
  // }


  searchMeal(){
    setTimeout(() => {
      this.recipesService.searchMealByName(this.searchTerm);
      this.router.navigateByUrl('/search');
      this.searchTerm = '';
    }, 3000)
    console.log('Clicked!');
  }

  goToFav(){
    this.router.navigateByUrl('/favorites');
  }
}
