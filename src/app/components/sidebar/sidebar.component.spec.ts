import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { RecipesService } from '../../services/recipes.service';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockRecipesService : jasmine.SpyObj<RecipesService>;

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
      imports: [SidebarComponent],
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
            snapshot: { paramMap: new Map() },
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return list of <a> tags', () => {
    expect(component.categoriesList().length).toBe(2);

    const tagEls = fixture.debugElement.queryAll(By.css('a'));

    expect(tagEls.length).toBe(2);
    expect(tagEls[0].nativeElement.textContent).toBe('one');
    expect(tagEls[1].nativeElement.textContent).toBe('two');
  })

  it('should categoriesList returned with value initiated to categoriesList of the service ', () => {
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

    expect(component.categoriesList()).toEqual(mockCategories);
  })
});
