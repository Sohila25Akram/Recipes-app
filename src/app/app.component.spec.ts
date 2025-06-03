import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { By } from '@angular/platform-browser';
import { RecipesService } from './services/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRecipesService: jasmine.SpyObj<RecipesService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['autoLogin']);
    mockRecipesService = jasmine.createSpyObj('RecipesService', ['searchedMeals']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        },
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
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'recipes' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('recipes');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Recipes');
  });
  describe('isolated-testing', () => {
    it('should auto login called', () => {
      expect(mockAuthService.autoLogin).toHaveBeenCalled();
    });
    it('should toggle isDrawerOpen when handleToggleDrawer is called', () => {
      expect(component.isDrawerOpen).toBeFalse();

      component.handleToggleDrawer();
      expect(component.isDrawerOpen).toBeTrue();

      component.handleToggleDrawer();
      expect(component.isDrawerOpen).toBeFalse();
    })
  })
  it('should list of links returned', () => {
    const liEls = fixture.debugElement.queryAll(By.css('li a'));

    expect(liEls.length).toBe(3);

    const firstEL = liEls[0].nativeElement;
    expect(firstEL.textContent).toBe('home');
  })
});
