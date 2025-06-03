import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let mockRecipesService: jasmine.SpyObj<RecipesService>;

  beforeEach(async () => {
    mockRecipesService = jasmine.createSpyObj('RecipesService', ['categoriesList']);

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

    mockRecipesService.categoriesList.and.returnValue(mockCategories);


    await TestBed.configureTestingModule({
      imports: [CategoriesComponent],
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
            snapshot: { paramMap: new Map() },
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list render when categoriesList set with value', () => {
    expect(component.categoriesList().length).toEqual(2);

    const listDls = fixture.debugElement.queryAll(By.css('li'));

    expect(listDls.length).toBe(2);
  });

  it('should categoriesList driven for categoriesList of service', () => {
    expect(component.categoriesList().length).toEqual(2);
  })
});
