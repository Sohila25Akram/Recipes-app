import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderDirective } from './loader.directive';
import { LoaderComponent } from '../components/loader/loader.component';
import { Component, DebugElement, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div [appLoader]="true" [isButton]="true"><div>Content</div></div>`,
  standalone: true,
  imports: [LoaderDirective, LoaderComponent]
})
class TestHostComponent {
}

describe('LoaderDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostDiv: DebugElement;


  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [LoaderDirective, LoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    // const directiveInstance = fixture.debugElement.query(By.directive(LoaderDirective));
    // const renderer = directiveInstance.injector.get(Renderer2);
    fixture.detectChanges();
    //  const directiveInstance = fixture.debugElement.query(By.directive(LoaderDirective));
    // const renderer = directiveInstance.injector.get(Renderer2);

    // hostDiv = fixture.debugElement.query(By.directive(LoaderDirective));
  })
  
  it('should create an instance', () => {
    const div = fixture.nativeElement.querySelector('div');
    expect(div).toBeTruthy();
  });
  it('should add ', () => {
    // const originEl = hostDiv.nativeElement.querySelector('div');
 const directiveDE = fixture.debugElement.query(By.directive(LoaderDirective));
  const directiveInstance = directiveDE.injector.get(LoaderDirective);
  const renderer = directiveDE.injector.get(Renderer2);

  // Spy on Renderer2.setStyle and ViewContainerRef.createComponent
  const setStyleSpy = spyOn(renderer, 'setStyle');
  const createComponentSpy = spyOn(directiveInstance['templateContent'], 'createComponent').and.callThrough();

  // directiveInstance.isButton = true;
  directiveInstance.addLoader();

  expect(setStyleSpy).toHaveBeenCalledWith(jasmine.anything(), 'display', 'none');
  // expect(createComponentSpy).toHaveBeenCalledWith(LoaderComponent);
    expect(createComponentSpy).toHaveBeenCalledWith(jasmine.any(Function));
  })
  it('should add loader-button class to mat-spinner when isButton is true', () => {
  const directiveEl = fixture.debugElement.query(By.directive(LoaderDirective));
  const directiveInstance = directiveEl.injector.get(LoaderDirective);
  const renderer = directiveEl.injector.get(Renderer2);

  const addClassSpy = spyOn(renderer, 'addClass').and.callThrough();

  directiveInstance.isButton = true;
  directiveInstance.addLoader();
  fixture.detectChanges();

  expect(addClassSpy).toHaveBeenCalledWith(
    jasmine.anything(), // mat-spinner element
    'loader-button'
  );
});
 it('should remove ', () => {
    // const originEl = hostDiv.nativeElement.querySelector('div');
 const directiveDE = fixture.debugElement.query(By.directive(LoaderDirective));
  const directiveInstance = directiveDE.injector.get(LoaderDirective);
  const renderer = directiveDE.injector.get(Renderer2);

  // Spy on Renderer2.setStyle and ViewContainerRef.createComponent
  const removeStyleSpy = spyOn(renderer, 'removeStyle');
  const clearComponentSpy = spyOn(directiveInstance['templateContent'], 'clear').and.callThrough();

  directiveInstance.removeLoader();

  expect(removeStyleSpy).toHaveBeenCalledWith(jasmine.anything(), 'display');

  expect(clearComponentSpy).toHaveBeenCalled();

 })

});
