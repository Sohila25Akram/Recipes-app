import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSectionComponent } from './categories-section.component';
import { RecipesService } from '../../services/recipes.service';
import { By } from '@angular/platform-browser';

describe('CategoriesSectionComponent', () => {
  let component: CategoriesSectionComponent;
  let fixture: ComponentFixture<CategoriesSectionComponent>;
  let mockRecipesService: jasmine.SpyObj<RecipesService>;

  beforeEach(async () => {
    mockRecipesService = jasmine.createSpyObj('RecipesService', ['categoriesList']);

    await TestBed.configureTestingModule({
      imports: [CategoriesSectionComponent],
      providers: [
        {
          provide: RecipesService,
          useValue: mockRecipesService
        }
      ],
    })
    .compileComponents();

    
    const mockCategories = [
      {
        idCategory: '',
        strCategory: 'Dessert',
        strCategoryThumb: 'image.jpg',
        strCategoryDescription: 'Dessert is a course that concludes a meal. The course usually consists of sweet foods, such as confections dishes or fruit, and possibly a beverage such as dessert wine or liqueur, however in the United States it may include coffee, cheeses, nuts, or other savory items regarded as a separate course elsewhere. In some parts of the world, such as much of central and western Africa, and most parts of China, there is no tradition of a dessert course to conclude a meal.\r\n\r\nThe term dessert can apply to many confections, such as biscuits, cakes, cookies, custards, gelatins, ice creams, pastries, pies, puddings, and sweet soups, and tarts. Fruit is also commonly found in dessert courses because of its naturally occurring sweetness. Some cultures sweeten foods that are more commonly savory to create desserts.'
      },
      {
        idCategory: '',
        strCategory: 'Breakfast',
        strCategoryThumb: 'image.jpg',
        strCategoryDescription: ''
      }
    ]

    mockRecipesService.categoriesList.and.returnValue(mockCategories)

    fixture = TestBed.createComponent(CategoriesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should categoriesList render list of categories', () => {
    expect(component.categoriesList().length).toBe(2);

    const listDs = fixture.debugElement.queryAll(By.css('li'));
    expect(listDs.length).toBe(2);

    const itemOne = listDs[0].nativeElement;
    expect(itemOne.textContent).toBe('Breakfast');

    const itemTwo = listDs[1].nativeElement;
    expect(itemTwo.textContent).toBe('Dessert')
  });

  it('should setCurrentCategory called when click on categoryname li', () => {
    spyOn(component, 'setCurrentCategory');

    const liEl = fixture.debugElement.query(By.css('li')).nativeElement;

    liEl.click();

    expect(component.setCurrentCategory).toHaveBeenCalledWith('Breakfast')
  });

  it('should active class added to li when become the currentCategoryName', () => {
    component.currentCategoryName.set('Breakfast');
    fixture.detectChanges();

    const liEl = fixture.debugElement.query(By.css('li')).nativeElement;

    expect(liEl.textContent).toBe('Breakfast');

    expect(liEl.classList.contains('active')).toBeTrue();
  });

   it('should currentCategory data be rendered', () => {
    const expectedCategory = mockRecipesService.categoriesList()
    .find(c => c.strCategory === 'Dessert')!;

    const categoryEl = fixture.debugElement.query(By.css('.grid-category'));
    expect(categoryEl).toBeTruthy();

    const imgEl = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.src).toContain(expectedCategory.strCategoryThumb);

    const titleEl = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(titleEl.textContent).toContain(expectedCategory.strCategory);

    
    const descEl = fixture.debugElement.query(By.css('p')).nativeElement;
    const expectedText = expectedCategory.strCategoryDescription.split(' ').slice(0, 20).join(' ') + '...';
    expect(descEl.textContent).toBe(expectedText);
  });

  it('should categoriesList based on categoriesList of service reversed', () => {
    const reversedList = mockRecipesService.categoriesList().reverse();
    expect(component.categoriesList().length).toBe(2);
    expect(component.categoriesList()).toEqual(reversedList);
  });

  it('should currentCategoryName set when setCurrentCategory called', () => {
    component.setCurrentCategory('Dessert');

    expect(component.currentCategoryName()).toBe('Dessert');
  })

  it('should currentCategory based on currentCategoryName', () => {
    component.currentCategoryName.set('Dessert');
    fixture.detectChanges();

    const expectedCategory = mockRecipesService.categoriesList().find(r => r.strCategory === component.currentCategoryName())!;

    expect(component.currentCategory()).toEqual(expectedCategory)
  });


});
