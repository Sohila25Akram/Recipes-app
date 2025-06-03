import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultComponent } from './search-result.component';
import { RecipesService } from '../../services/recipes.service';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let mockRecipesService: jasmine.SpyObj<RecipesService> 

  beforeEach(async () => {
    mockRecipesService = jasmine.createSpyObj('RecipesService', ['searchedMeals']);

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
    const mockRecipes = [mockData, mockData, mockData, mockData];

    mockRecipesService.searchedMeals.and.returnValue(mockRecipes);

    await TestBed.configureTestingModule({
      imports: [SearchResultComponent], 
      providers: [
        {
          provide: RecipesService,
          useValue: mockRecipesService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: { paramMap: new Map() }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('render-based', () => {
    it('should ul returned when length of searchedItems greater than 0', () => {
      expect(component.searchedItems().length).toBe(4);

      const ulEl = fixture.debugElement.query(By.css('ul'));
      expect(ulEl).toBeTruthy();
    })
    it('should list of pagination items rendered', () => {
      expect(component.paginatedItems.length).toBe(3);

      const liEls = fixture.debugElement.queryAll(By.css('li'));

      expect(liEls.length).toBe(3);

    })
    it('should paginator render when searchedItems length is greater than 3', () => {
      const paginatorEl = fixture.debugElement.query(By.css('mat-paginator')).nativeElement;
      expect(paginatorEl).toBeTruthy()
    })
  });

  describe('isolated', () => {
    it('should searchedItems returned with value initiated to the searchedMeals in service', () => {
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
    const mockRecipes = [mockData, mockData, mockData, mockData];

    expect(component.searchedItems()).toEqual(mockRecipes);
    })

    it('should update currentPage and pageSize when onPageChange called', () => {
      const mockEvent = {pageIndex: 0, pageSize: 3};

      component.onPageChange(mockEvent);

      expect(component.currentPage).toBe(0);
      expect(component.pageSize).toBe(3);
    });
    // it('should return first 3 items when currentPage = 0 and pageSize = 3', () => {
    //   component.currentPage = 0;
    //   component.currentPage = 3;
    //   fixture.detectChanges();

    //   const result = component.paginatedItems;

    //   expect(result.length).toBe(3);
    //   expect(result[0].strMeal).toBe('pan cake');
    //   expect(result[2].strMeal).toBe('pan cake');

    //   expect(component.searchedItems.length).toBe(4)
    // });
    // it('should return last 3 items when currentPage = 1 and pageSize = 3', () => {
    //   component.currentPage = 1;
    //   component.currentPage = 3;
    //   fixture.detectChanges();

    //   const result = component.paginatedItems;

    //   expect(result.length).toBe(1);
    //   expect(result[0].strMeal).toBe('pan cake');

    // });
  })


});
