import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperComponent } from './wrapper.component';
import { RecipesService } from '../../services/recipes.service';

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let mockRecipesService: jasmine.SpyObj<RecipesService>;

  beforeEach(async () => {
    mockRecipesService = jasmine.createSpyObj('RecpesService', ['categoriesList'])
    await TestBed.configureTestingModule({
      imports: [WrapperComponent],
      providers: [
        {
          provide: RecipesService,
          useValue: mockRecipesService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
