import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCardComponent } from './category-card.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CategoryCardComponent', () => {
  let component: CategoryCardComponent;
  let fixture: ComponentFixture<CategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCardComponent], 
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
          params: of({}),
          queryParams: of({}),
          snapshot: { paramMap: new Map() },
        },
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should print category data', () => {
    const mockData = {
      idCategory: '11111',
      strCategory: 'meat',
      strCategoryThumb: 'image.jpg',
      strCategoryDescription: 'description'
    }
    component.category = mockData;
    fixture.detectChanges();

    const imgEl = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.src).toContain('image.jpg');
    expect(imgEl.alt).toContain('meat');

    const linkEl = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(linkEl.textContent).toBe('meat');

    const descEl = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(descEl.textContent)
  })
  describe('category description', () => {
    it('should render description with ellipsis when fullDesc with false', () => {
       const mockDescText = 'Crust: make a dough from 250g flour (I like mixing different flours like plain and wholegrain spelt flour), 125g butter, 1 egg and a pinch of salt, press it into a tart form and place it in the fridge. Filling: stir 300g cream cheese and 100ml milk until smooth, add in 3 eggs, 100g grated parmesan cheese and season with salt, pepper and nutmeg. Take the crust out of the fridge and prick the bottom with a fork. Pour in the filling and bake at 175 degrees C for about 25 minutes. Cover the tart with some aluminium foil after half the time. In the mean time, slice about 350g mini tomatoes. In a small pan heat 3tbsp olive oil, 3tbsp white vinegar, 1 tbsp honey, salt and pepper and combine well. Pour over the tomato slices and mix well. With a spoon, place the tomato slices on the tart, avoiding too much liquid on it. Decorate with basil leaves and enjoy'

      const mockData = {
        idCategory: '11111',
        strCategory: 'meat',
        strCategoryThumb: 'image.jpg',
        strCategoryDescription: mockDescText
      }
      component.category = mockData;
      fixture.detectChanges();

      component.fullDesc = false;
      fixture.detectChanges();

      const descEl = fixture.debugElement.query(By.css('p')).nativeElement;
      expect(descEl).toBeTruthy();

      const expectedText = mockData.strCategoryDescription.split(' ').slice(0, 20).join(' ') + '...';
      expect(descEl.textContent).toBe(expectedText);
    });
     it('should render full desciption when fullDesc with true', () => {
      const mockDescText = 'Crust: make a dough from 250g flour (I like mixing different flours like plain and wholegrain spelt flour), 125g butter, 1 egg and a pinch of salt, press it into a tart form and place it in the fridge. Filling: stir 300g cream cheese and 100ml milk until smooth, add in 3 eggs, 100g grated parmesan cheese and season with salt, pepper and nutmeg. Take the crust out of the fridge and prick the bottom with a fork. Pour in the filling and bake at 175 degrees C for about 25 minutes. Cover the tart with some aluminium foil after half the time. In the mean time, slice about 350g mini tomatoes. In a small pan heat 3tbsp olive oil, 3tbsp white vinegar, 1 tbsp honey, salt and pepper and combine well. Pour over the tomato slices and mix well. With a spoon, place the tomato slices on the tart, avoiding too much liquid on it. Decorate with basil leaves and enjoy'

      const mockData = {
        idCategory: '11111',
        strCategory: 'meat',
        strCategoryThumb: 'image.jpg',
        strCategoryDescription: mockDescText
      }
      component.category = mockData;
      fixture.detectChanges();

      component.fullDesc = true;
      fixture.detectChanges();

      const descEl = fixture.debugElement.query(By.css('p')).nativeElement;
      expect(descEl).toBeTruthy();
      expect(descEl.textContent).toBe(mockDescText);
    })
  })
  
  
});
