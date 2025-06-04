import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Meal } from '../../models/meal.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRecipesService: jasmine.SpyObj<RecipesService>;

  beforeEach(async () => {
    mockRecipesService = jasmine.createSpyObj('RecipesService', ['categoriesList']);
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: RecipesService,
          useValue: mockRecipesService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params : of([]),
            queryParams: of({}),
            snapshot: { paramMap: new Map()}
          }
        }
      ]
    })
    .compileComponents();

    const mockCategories = [
      {
        idCategory: '',
        strCategory: '',
        strCategoryThumb: '',
        strCategoryDescription: ''
      },
      {
        idCategory: '',
        strCategory: '',
        strCategoryThumb: '',
        strCategoryDescription: ''
      }
    ]

    mockRecipesService.categoriesList.and.returnValue(mockCategories);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render list of recentRecipes', () => {
    const liDs = fixture.debugElement.queryAll(By.css('.recipe-li'));

    expect(liDs.length).toBe(4);
  })
});
