import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CategoryRecipesComponent } from './category-recipes.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { RecipesService } from '../../services/recipes.service';
import { By } from '@angular/platform-browser';

describe('CategoryRecipesComponent', () => {
  let component: CategoryRecipesComponent;
  let fixture: ComponentFixture<CategoryRecipesComponent>;
  let mockRecipesService: jasmine.SpyObj<RecipesService>;
  let mockActivatedRoute: { paramMap: any; };

  beforeEach(async () => {

    mockRecipesService = jasmine.createSpyObj('RecipesService', ['getRecipesOfCategory', 'categoriesList', 'recipesOfCategory']);
    mockActivatedRoute = {
      paramMap : of(convertToParamMap({ categoryName: 'dessert' }))
    }

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

     const mockCategories = [
      {
        idCategory: '0',
        strCategory: 'one',
        strCategoryThumb: '',
        strCategoryDescription: ''
      },
        {
        idCategory: '1',
        strCategory: 'two',
        strCategoryThumb: '',
        strCategoryDescription: ''
      }
    ];

    mockRecipesService.recipesOfCategory.and.returnValue([mockData, mockData]);
    mockRecipesService.categoriesList.and.returnValue(mockCategories)

    await TestBed.configureTestingModule({
      imports: [CategoryRecipesComponent],
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

    fixture = TestBed.createComponent(CategoryRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should render list of recipes', () => {
  //   expect(component.recipesOfCurrentCategory().length).toBe(2);

  //   const liDls = fixture.debugElement.queryAll(By.css('li'));

  //   expect(liDls.length).toBe(2);
  // });
  it('should call getRecipesOfCategory with correct category name on init', () => {
    expect(component.currentCategoryName).toBe('dessert');
    expect(mockRecipesService.getRecipesOfCategory).toHaveBeenCalledWith('dessert');
  });
  it('should categoriesList driven form the recipes have the currentCategoryName', () => {
     expect(component.currentCategoryName).toBe('dessert');

     const currentRecipes = mockRecipesService.categoriesList().find(r => r.strCategory === 'dessert')!;

     expect(component.currentCategory()).toEqual(currentRecipes);
  });
  it('should recipesOfCurrentCategory be equal recipesOfCategory', () => {
    expect(component.recipesOfCurrentCategory().length).toEqual(2);
  })
  it('should return idMeal from trackById', () => {
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

    component.trackById(0, mockData);

    const result = component.trackById(0, mockData);
    expect(result).toBe('11111');
  })
});
