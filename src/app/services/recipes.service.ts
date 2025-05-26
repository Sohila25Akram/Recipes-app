import { afterNextRender, DestroyRef, inject, Injectable, Signal, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Category, Meal } from '../models/meal.model';
import { AuthService } from './auth.service';
import { exhaustMap, map, Observable, take, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private url = 'https://www.themealdb.com/api/json/v1/1';

  private apiService = inject(ApiService);
  // private authService = inject(AuthService);

  searchedMeals = signal<Meal[]>([]);
  categoriesList  = signal<Category[]>([]);
  recipesAddedToFav = signal<Meal[]>([]);
  singleMeal = signal<Meal>({
    idMeal: '',
    strMeal: '',
    strCategory: '',
    strArea: '',
    strInstructions: '',
    strMealThumb: '',
    strTags: '',
    strYoutube: '',
    strIngredient1: '',
    strIngredient2: '',
    strIngredient3: '',
    strIngredient4: '',
    strIngredient5: '',
    strIngredient6: '',
    strIngredient7: '',
    strIngredient8: '',
    strIngredient9: '',
    strIngredient10: '',
    strIngredient11: '',
    strIngredient12: '',
    strIngredient13: '',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: '',
    strIngredient17: '',
    strIngredient18: '',
    strIngredient19: '',
    strIngredient20: '',
    strMeasure1: '',
    strMeasure2: '',
    strMeasure3: '',
    strMeasure4: '',
    strMeasure5: '',
    strMeasure6: '',
    strMeasure7: '',
    strMeasure8: '',
    strMeasure9: '',
    strMeasure10: '',
    strMeasure11: '',
    strMeasure12: '',
    strMeasure13: '',
    strMeasure14: '',
    strMeasure15: '',
    strMeasure16: '',
    strMeasure17: '',
    strMeasure18: '',
    strMeasure19: '',
    strMeasure20: '',
    strSource: '',
    strImageSource: null,
    strCreativeCommonsConfirmed: null,
    dateModified: null
  });
  recipesOfCategory = signal<Meal[]>([]);

  constructor(){
    this.loadCategories();
    afterNextRender(() => {
      this.recipesAddedToFav.set(this.loadFavoritesFromLocalStorage())
    })
  }
  private loadCategories(){
    this.apiService.request<{ categories: Category[] }>('GET', `${this.url}/categories.php`)
    .pipe(
      map(res => [...res.categories].reverse())
    ).subscribe(categories => {this.categoriesList.set(categories)});
  }

  
  private loadFavoritesFromLocalStorage(): Meal[] {
    const stored = localStorage.getItem('favoriteRecipes');
    return stored ? JSON.parse(stored) : [];
  }
  get token(){
    let tokeny = null;
    const storedUser = localStorage.getItem('userData');
    if(storedUser){
      const parsedUser = JSON.parse(storedUser);
      tokeny= parsedUser.accessToken;
    }
    return tokeny;
  }

  searchMealByName(term: string) : Observable<Meal[]>{
    //------- pass token interceptor -------------

    return this.apiService.request<{ meals: Meal[] }>('GET', `${this.url}/search.php`, {
      params: new HttpParams().set('s', term),
      // headers: {'Authorization': `Bearer ${this.token}`}
    }).pipe(map((response) =>  response.meals || []
      //   if(term){
      //         localStorage.setItem('searchedItem' , term);

      // }
    ), tap(meals => this.searchedMeals.set(meals)));
    // this.destroyRef.onDestroy(() => supsription.unsubscribe())


    //------ pass the token to the request (not token interceptor) --------

    //way 1 - use the local storage
    // this.apiService.request<{ meals: Meal[] }>('GET', `${this.url}/search.php`, {
    //   params: { s: term },
    //   // headers: {'Authorization': `Bearer ${this.token}`}
    // }).subscribe((response) => {
    //   this.searchedMeals.set(response.meals || []); // handle null response
    // });


    //way 2 - use token  form the service not localStorage
    // this.authService.user.pipe(take(1) , exhaustMap(user => {
    //   return this.apiService.request<{ meals: Meal[] }>('GET', `${this.url}/search.php`, {
    //   params: { s: term },
    //   // headers: { 'Authorization': `Bearer ${user?.accessToken}` }
    // }).pipe(
    //     map(response => {
    //       return response.meals || [];
    //     }) 
    //   ) 
    // })).subscribe((meals: Meal[]) => {
    //   this.searchedMeals.set(meals || []);
    // })
  }

  getRecipeDetails(id: string){
    this.apiService.request<{ meals: Meal[] }>('GET', `${this.url}/lookup.php`, {
      params: { i: id }
    }).subscribe(
      res => this.singleMeal.set(res.meals[0]) // get the first (and only) meal
    );

  }

  getRecipesOfCategory(categoryName: string){
    this.apiService.request<{meals: Meal[]}>('GET', `${this.url}/filter.php`, {
      params: {c: categoryName}
    }).subscribe(res => this.recipesOfCategory.set(res.meals));
  }

  getSexRecipesOfCategory(categoryName: string){
    return this.apiService.request<{meals: Meal[]}>('GET', `${this.url}/filter.php`, {
      params: {c: categoryName}
    }).pipe(map(res => res.meals), take(1));
  }

  addToFavourite(id: string){
    const recipe = this.searchedMeals().find(r => r.idMeal === id);

    if(recipe && !this.recipesAddedToFav().some(r => r.idMeal === id)){
      this.recipesAddedToFav.update((favorites) => [...favorites, recipe]);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(this.recipesAddedToFav()));
  }

  removeFromFavourite(id: string){
    this.recipesAddedToFav.update((favorites) =>
      favorites.filter((r) => r.idMeal !== id)
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(this.recipesAddedToFav()));
  }
}
