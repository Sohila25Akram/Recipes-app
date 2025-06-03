import { TestBed } from '@angular/core/testing';

import { RecipesService } from './recipes.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { HttpParams } from '@angular/common/http';

describe('RecipesService', () => {
  let service: RecipesService;
  let mockApiService: jasmine.SpyObj<ApiService>;

  const mockCategories = [
    { idCategory: '1', strCategory: 'Beef', strCategoryThumb: '', strCategoryDescription: '' },
    { idCategory: '2', strCategory: 'Chicken', strCategoryThumb: '', strCategoryDescription: '' }
  ];

   const mockMeal = {
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

    const mockMeals = [mockMeal, mockMeal]


  beforeEach(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['request']);
    TestBed.configureTestingModule({
      providers:[
        {
          provide: ApiService,
          useValue: mockApiService
        }
      ]
    });
    mockApiService.request.and.returnValue(of());

    service = TestBed.inject(RecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // it('should loadCategories called', () => {
  //   spyOn(service, 'loadCategories');
  //   expect(service.loadCategories).toHaveBeenCalled();
  // });
  it('should load categories', () => {
    mockApiService.request.and.returnValue(of({ categories: mockCategories }));

    service.loadCategories();

    expect(service.categoriesList()).toEqual(mockCategories.reverse());
  });

  it('should call API with search term and update searchedMeals', () => {
    const searchTerm = 'dessert';

    mockApiService.request.and.returnValue(of({ meals: mockMeals }));

    service.searchMealByName(searchTerm).subscribe(meals => {
      expect(meals).toEqual(mockMeals);
      expect(service.searchedMeals()).toEqual(mockMeals);
    })

    const expectedUrl = 'https://www.themealdb.com/api/json/v1/1/search.php';

    expect(mockApiService.request).toHaveBeenCalledWith(
      'GET',
      expectedUrl,
      jasmine.objectContaining({
        params: jasmine.any(HttpParams)
      })
    );
  });
  it('should fetch recipe details and set singleMeal', () => {
    const id = '11111';
    mockApiService.request.and.returnValue(of({meals : [mockMeal]}));
      
    service.getRecipeDetails(id);

    expect(service.singleMeal()).toEqual(mockMeal);

    const expectedUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php';

    expect(mockApiService.request).toHaveBeenCalledWith(
      'GET',
      expectedUrl,
      {params: {i: id}}
    )
  });
  it('should fetch recipes for a category and set recipesOfCategory', () => {
    const categoryName = 'dessert';
    mockApiService.request.and.returnValue(of({meals : mockMeals}));
      
    service.getRecipesOfCategory(categoryName);

    expect(service.recipesOfCategory()).toEqual(mockMeals);

    const expectedUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php';

    expect(mockApiService.request).toHaveBeenCalledWith(
      'GET',
      expectedUrl,
      {params: {c: categoryName}}
    )
  });
  // it('should update recipesAddedToFav when addToFavourite called', () => {
  //   const id = '11111';
  //   service.addToFavourite(id);

  //   expect(service.recipesAddedToFav()).toEqual(mockMeals)
  // })
  // it('remove ...')
});
