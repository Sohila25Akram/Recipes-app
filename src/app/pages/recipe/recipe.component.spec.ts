import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeComponent } from './recipe.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { Observable, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { query } from 'express';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;
  let mockRecipesService: jasmine.SpyObj<RecipesService>;
  let mockActivatedRoute: { paramMap: any; };

  beforeEach(async () => {
    mockRecipesService = jasmine.createSpyObj('RecipesService', ['singleMeal', 'getRecipeDetails', 'addToFavourite', 'categoriesList']);
     const mockData = {
      idMeal: '11111',
      strMeal: 'pan cake',
      strCategory: 'dessert',
      strArea: '',
      strInstructions: 'description',
      strMealThumb: 'image.jpg',

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
      strImageSource: '',
      strCreativeCommonsConfirmed: '',
      dateModified: '',
    }

    mockRecipesService.singleMeal.and.returnValue(mockData);
    mockRecipesService.getRecipeDetails.and.returnValue();
    mockActivatedRoute = {
      paramMap: of(convertToParamMap({ id: '111' }))
    };
  
    await TestBed.configureTestingModule({
      imports: [RecipeComponent],
      // schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          provide: RecipesService,
          useValue: mockRecipesService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should addToFav called when click button', () => {
    spyOn(component, 'addToFav');

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;

    buttonEl.click();
    
    expect(component.addToFav).toHaveBeenCalled()
  })
  it('should recipe data rndered if found', () => {
     const mockData = {
      idMeal: '11111',
      strMeal: 'pan cake',
      strCategory: 'dessert',
      strArea: '',
      strInstructions: 'description',
      strMealThumb: 'image.jpg',

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
      strImageSource: '',
      strCreativeCommonsConfirmed: '',
      dateModified: '',
    }

    expect(component.recipe()).toEqual(mockData);

    const h2El = fixture.debugElement.query(By.css('h2')).nativeElement
    expect(h2El.textContent).toContain(mockData.strMeal);

    const imgEl = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.src).toContain('image.jpg');

    const descEl = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(descEl.textContent).toContain('description');
  });

  it('should recipe equal singleMeal', () => {
      const mockData = {
      idMeal: '11111',
      strMeal: 'pan cake',
      strCategory: 'dessert',
      strArea: '',
      strInstructions: 'description',
      strMealThumb: 'image.jpg',

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
      strImageSource: '',
      strCreativeCommonsConfirmed: '',
      dateModified: '',
    }

    expect(component.recipe()).toEqual(mockData)
  });
  it('should getRecipeDetails called with currentMealId', () => {
    expect(mockRecipesService.getRecipeDetails).toHaveBeenCalledWith('111')
  })

  it('should addToFavorite add currentMealId when call addToFav' , () => {
    const idMeal = '222';
     component.currentMealId = idMeal;
    fixture.detectChanges();

    component.addToFav();

    expect(mockRecipesService.addToFavourite).toHaveBeenCalledWith(idMeal)
  });
});
