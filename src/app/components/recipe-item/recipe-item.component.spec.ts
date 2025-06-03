import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemComponent } from './recipe-item.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeItemComponent],
      providers: [
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

    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render recipe item data', () => {
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
    component.recipeItem = mockData;
    fixture.detectChanges();

    const imgEl = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.src).toContain('image.jpg');
    expect(imgEl.alt).toBe('pan cake');

    const titleEl = fixture.debugElement.query(By.css('h2 a')).nativeElement;
    expect(titleEl.textContent).toContain('pan cake');
  });

  // it('should route to the page currectly when path has value', () => {
  //   component.path ='';
  //   fixture.detectChanges();

  //   const titleEl = fixture.debugElement.query(By.css('h2 a')).nativeElement;
  //   titleEl.click();

  //   expect
  // })
});
