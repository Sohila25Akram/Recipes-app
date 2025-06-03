import { Directive, effect, ElementRef, inject, input, Input, OnChanges, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';

@Directive({
  selector: '[appLoader]',
  standalone: true,
})
export class LoaderDirective implements OnChanges{
  // isLoading = input(false, { alias: 'appLoader' });
  // isButton = input(false);

  @Input('appLoader') isLoading = false;
  @Input() isButton = false;

  // private renderer = inject(Renderer2);
  // private el = inject(ElementRef);
  // private templateContent = inject(ViewContainerRef)
  // private spinnerRef: HTMLElement | null = null;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private templateContent: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {  
    if(changes['isLoading']){
      if(this.isLoading){
        this.addLoader();
      }else{
        this.removeLoader();
      }
    }
  }

  addLoader(){
    const originalEl = this.el.nativeElement.querySelector('div');
    if (originalEl) {
      this.renderer.setStyle(originalEl, 'display', 'none');
    }
    
    const loaderRef = this.templateContent.createComponent(LoaderComponent);

    if (this.isButton) {
      const loaderElement = loaderRef.location.nativeElement.querySelector('mat-spinner');
      if (loaderElement) {
        this.renderer.addClass(loaderElement, 'loader-button');
      }
    }
  }

  removeLoader(){
    const originalEl = this.el.nativeElement.querySelector('div');

    if (originalEl) {
      this.renderer.removeStyle(originalEl, 'display');
    }

    this.templateContent.clear()
  }

}
