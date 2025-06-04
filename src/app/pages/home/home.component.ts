import { Component, computed, effect, inject, signal } from '@angular/core';
import { Meal } from '../../models/meal.model';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { CategoriesSectionComponent } from '../../components/categories-section/categories-section.component';

@Component({
  selector: 'app-home',
  imports: [ RecipeItemComponent, CategoriesSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  recentRecipes: Meal[] = [
    {
      idMeal: '52982', 
      strMeal: 'Spaghetti alla Carbonara', 
      strMealThumb: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg', 
      strInstructions: '',
      strCategory: 'Pasta'
    },
    {
      idMeal: '52905',
      strMeal: 'Chocolate Souffle',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/twspvx1511784937.jpg',
      strInstructions: '',
      strCategory: 'Dessert'
    },
     {
      idMeal: '52963',
      strMeal: 'Shakshuka',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/g373701551450225.jpg',
      strInstructions: '',
      strCategory: 'Vegetarian'
    },
     {
      idMeal: '53076',
      strMeal: 'Bread omelette',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg',
      strInstructions: 'Breakfast',
      strCategory: 'Dessert'
    }
  ]

  // recentRecipesIDs: string[] = [
  //   '52982',
  //   '52905',
  //   '52963',
  //   '53076'
  // ]

  // constructor() {
  //   this.loadRecentRecipes();
  // }

  // loadRecentRecipes(){
  //   setTimeout(() => {
  //     const meals:Meal[] = [];
  //     this.recentRecipesIDs.forEach(element => {
  //       this.recipesService.getRecipeDetails(element);
  //       meals.push(this.recipesService.singleMeal());
  //     });

  //     this.recentRecipes.set(meals);
  //   }, 2000)
   
  // }
}
