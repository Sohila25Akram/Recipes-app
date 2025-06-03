import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';
import { RecipesService } from '../../services/recipes.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockRecipesService: jasmine.SpyObj<RecipesService>;

  beforeEach(async () => {
    mockRecipesService = jasmine.createSpyObj('RecipesService', ['searchMealByName', 'categoriesList', 'searchedMeals']);

    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        {
          provide: RecipesService,
          useValue: mockRecipesService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([]),
            queryParams: of({}),
            snapshot: { paramMap: new Map()}
          }
        }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

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

    mockRecipesService.searchedMeals.and.returnValue([mockData, mockData])

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('render-based' , () => {
    describe('input testing', () => {
      it('should placeholder be correct', () => {
        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

        expect(inputEl.placeholder).toBe('search');
      });
      it('should input bind searchTerm', () => {
        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

        inputEl.value = 'chocolate';
        inputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.searchTerm).toBe('chocolate')
      })
      it('should reflect searchTerm to input value', fakeAsync(() => {
        component.searchTerm = 'chocolate';
        fixture.detectChanges();
        tick();

        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

        expect(inputEl.value).toBe('chocolate');

      }))
    })
    it('should searchMeal called when click on the button', () => {
      const btnEl = fixture.debugElement.query(By.css('button')).nativeElement;

      spyOn(component, 'searchMeal');
      btnEl.click();

      expect(component.searchMeal).toHaveBeenCalled();
    });

    // test loading directive***************
    //****************** */
    //******************** */
  });
  describe('isolated testing', () => {
    // it('should searchedItem displayed', () => {
    //   expect(component.searchedItem).toBe('chocolate')
    // })
    it('should call searchMealByName, update isLoading and call markForCheck on success', fakeAsync(() => {

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

      mockRecipesService.searchMealByName.and.returnValue(of([mockData, mockData]));

      component.searchTerm = 'chocolate';
      fixture.detectChanges();

       component.searchMeal();
       expect(component.isLoading).toBeTrue();

      tick(3000);

      expect(mockRecipesService.searchMealByName).toHaveBeenCalledWith('chocolate');
      expect(component.isLoading).toBeFalse();
    }));
    //  it('should set isLoading false and call markForCheck on error', fakeAsync(() => {

    //   const mockError = new Error('Network error')
    //   mockRecipesService.searchMealByName.and.returnValue(throwError(() => mockError));

    //   component.searchTerm = 'pasta';
    //   fixture.detectChanges();

    //    component.searchMeal();
    //    expect(component.isLoading).toBeTrue();

    //   tick(3000);

    //   expect(mockRecipesService.searchMealByName).toHaveBeenCalledWith('chocolate');
    //   expect(component.isLoading).toBeFalse();
    // }));
  })
});
