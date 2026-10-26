import { afterNextRender, Component, ElementRef, EventEmitter, inject, input, Input, output, Output, signal, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


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
  // private recipesService = inject(RecipesService);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  // @ViewChild('favoriteBtn') favorite!: ElementRef<HTMLButtonElement>;

  // @Input() toggleDrawer!: () => void;
  // @Input() isOpen!: boolean;

  searchTerm = '';

  isLogged = this.authService.isLogged;
  user = this.authService.user;
  
  // isOpen: boolean = false;
  @Output() toggleDrawer = new EventEmitter<boolean>()

  onToggle(){
    // this.isOpen = !this.isOpen;
    this.toggleDrawer.emit();
  }


  // onToggle() {
  //   this.toggleDrawer();
  // }

  // updateSearch(term: string) {
  //   // this.searchedItem.set(term);
  //   localStorage.setItem('searchedItem', term);
  // }


  // searchMeal(){
  //   // setTimeout(() => {
  //   //   this.recipesService.searchMealByName(this.searchTerm);
  //   //   this.router.navigateByUrl('/search');
  //   //   this.searchTerm = '';
  //   // }, 3000)
  //   // console.log('Clicked!');
  //   // this.updateSearch(this.searchTerm)
  //     this.activatedRoute.queryParamMap.subscribe(params => {

  //     const term = params.get('searchTerm') ?? '';

  //     this.searchTerm = term;
  //     // this.searchedItem.set(term);

  //     if (term) {
  //       this.searchMeal();
  //     }
  //   });
  // }

  goToSearch(){
    this.router.navigate(['/search'], {
      queryParams: {
        searchTerm: this.searchTerm
      }
    });

    this.searchTerm = '';
  }

  // goToFav(){
  //   this.router.navigateByUrl('/favorites');
  // }
  goToAuth(){
    this.router.navigateByUrl('/auth');
  }
}
