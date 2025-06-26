import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RecipesService } from '../../services/recipes.service';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRecipesService: jasmine.SpyObj<RecipesService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRecipesService = jasmine.createSpyObj('RecipesService', [
      'searchMealByName',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    mockRouter.navigateByUrl.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        {
          provide: RecipesService,
          useValue: mockRecipesService,
        },
        { provide: Router, useValue: mockRouter }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('function called when click', () => {
    it('should searchMeal() called when click on the button', () => {
      const btnEl = fixture.debugElement.query(
        By.css('.search-icon')
      ).nativeElement;

      spyOn(component, 'searchMeal');

      btnEl.click();
      fixture.detectChanges();

      expect(component.searchMeal).toHaveBeenCalled();
    });
    it('should goToFav() called when click on the button', () => {
      const btnEl = fixture.debugElement.query(
        By.css('.favorite-icon')
      ).nativeElement;

      spyOn(component, 'goToFav');

      btnEl.click();
      fixture.detectChanges();

      expect(component.goToFav).toHaveBeenCalled();
    });
     it('should goToAuth() called when click on the button', () => {
      const btnEl = fixture.debugElement.query(
        By.css('.profile-icon')
      ).nativeElement;

      spyOn(component, 'goToAuth');

      btnEl.click();
      fixture.detectChanges();

      expect(component.goToAuth).toHaveBeenCalled();
    });
    it('should onToggle() called when click on the button', () => {
      const btnEl = fixture.debugElement.query(
        By.css('.menu-icon')
      ).nativeElement;

      spyOn(component, 'onToggle');

      btnEl.click();
      fixture.detectChanges();

      expect(component.onToggle).toHaveBeenCalled();
    });
  });

  describe('input testing', () => {
    it('should placeholder init value render', () => {
      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

      expect(inputEl.placeholder).toContain('Type to Search...');
    });
    it('should bind input value to searchTerm (ngModel)', () => {
      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;

      inputEl.value = 'chocolate';
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.searchTerm).toBe('chocolate');
    });
    it('should reflect searchTerm value in the input field', fakeAsync(() => {
      component.searchTerm = 'cheese';
      fixture.detectChanges();
      tick();

      const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
      expect(inputEl.value).toBe('cheese');
    }));
  });
  describe('isolated testing', () => {
    it('should call searchMealByName and navigate to "/search" after 3 seconds when searchMeal called', fakeAsync(() => {
      component.searchTerm = 'chocolate';
      fixture.detectChanges();

      component.searchMeal();
      tick(3000);

      expect(mockRecipesService.searchMealByName).toHaveBeenCalledWith('chocolate');
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/search');
      expect(component.searchTerm).toBe('');

    }));
    it('should navigate to "/favorites" when goToFav called', () => {
      component.goToFav();

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/favorites');
    });
  });
});
