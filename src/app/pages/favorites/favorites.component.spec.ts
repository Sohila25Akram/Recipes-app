import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { RecipesService } from '../../services/recipes.service';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let mockRecipesService: jasmine.SpyObj<RecipesService>;

  beforeEach(async () => {
    mockRecipesService = jasmine.createSpyObj('RecipesService', ['recipesAddedToFav', 'removeFromFavourite']);

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

    const mockDataArray = [mockData, mockData, mockData]

    mockRecipesService.recipesAddedToFav.and.returnValue(mockDataArray);
    // mockRecipesService.removeFromFavourite.and.returnValue();


    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
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
              snapshot: { paramMap: new Map() }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should recipesInFavorite equal recipesAddedToFav', () => {
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

    const mockDataArray = [mockData, mockData, mockData]

    expect(component.recipesInFavorite()).toEqual(mockDataArray)
  });
  it('should removeFromFavourite work when call deleteFromFav', () => {
    component.deleteFromFav('1');

    expect(mockRecipesService.removeFromFavourite).toHaveBeenCalledWith('1');
  });
  // it('should datasource equals recipesInFavorite', fakeAsync(() => {
  

  //    const mockData = {
  //     idMeal: '11111',
  //     strMeal: 'pan cake',
  //     strCategory: 'dessert',
  //     strArea: '',
  //     strInstructions: 'description',
  //     strMealThumb: 'image.jpg',

  //     strTags: '',
  //     strYoutube: '',
  //     strIngredient1: '',
  //     strIngredient2: '',
  //     strIngredient3: '',
  //     strIngredient4: '',
  //     strIngredient5: '',
  //     strIngredient6: '',
  //     strIngredient7: '',
  //     strIngredient8: '',
  //     strIngredient9: '',
  //     strIngredient10: '',
  //     strIngredient11: '',
  //     strIngredient12: '',
  //     strIngredient13: '',
  //     strIngredient14: '',
  //     strIngredient15: '',
  //     strIngredient16: '',
  //     strIngredient17: '',
  //     strIngredient18: '',
  //     strIngredient19: '',
  //     strIngredient20: '',

  //     strMeasure1: '',
  //     strMeasure2: '',
  //     strMeasure3: '',
  //     strMeasure4: '',
  //     strMeasure5: '',
  //     strMeasure6: '',
  //     strMeasure7: '',
  //     strMeasure8: '',
  //     strMeasure9: '',
  //     strMeasure10: '',
  //     strMeasure11: '',
  //     strMeasure12: '',
  //     strMeasure13: '',
  //     strMeasure14: '',
  //     strMeasure15: '',
  //     strMeasure16: '',
  //     strMeasure17: '',
  //     strMeasure18: '',
  //     strMeasure19: '',
  //     strMeasure20: '',
  //     strSource: '',
  //     strImageSource: '',
  //     strCreativeCommonsConfirmed: '',
  //     dateModified: '',
  //   }

  //   const mockDataArray = [mockData, mockData, mockData];
    
   
  //   tick(2000)
  
  //   expect(component.dataSource.data).toEqual(mockDataArray)
  // }))

//   it('should deleteFromFav when click on delete button',() => {
//     spyOn(component, 'deleteFromFav');

//     const deleteBtnEl = fixture.debugElement.query(By.css('.delete-btn'));
// deleteBtnEl.triggerEventHandler('click');

//     expect(component.deleteFromFav).toHaveBeenCalledWith('111111')
//   })



});
