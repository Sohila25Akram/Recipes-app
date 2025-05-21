import { Directive, effect, ElementRef, inject, input, Input, OnChanges, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLoader]',
  standalone: true,
})
export class LoaderDirective implements OnChanges{
  isLoading = input(false, { alias: 'appLoader' });

  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  private spinnerRef: HTMLElement | null = null;

  ngOnChanges(changes: SimpleChanges): void {  
    if(changes['isLoading']){
      if(this.isLoading()){
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

    const spinner = this.renderer.createElement('mat-spinner');

    // this.renderer.setAttribute(spinner, 'color', 'accent')
    this.renderer.setStyle(spinner, 'width', '50px');    
    this.renderer.setStyle(spinner, 'height', '50px');
    // this.renderer.setStyle(spinner, 'color', '#ec7532');
    this.renderer.setStyle(spinner, 'position', 'absolute');
    this.renderer.setStyle(spinner, 'top', '50%');
    this.renderer.setStyle(spinner, 'left', '50%');
    this.renderer.setStyle(spinner, 'transform', 'translate(-50%, -50%)');
    this.renderer.setStyle(spinner, 'display', 'block');

    this.renderer.appendChild(this.el.nativeElement, spinner);
    this.spinnerRef = spinner;
  }

  removeLoader(){
    const originalEl = this.el.nativeElement.querySelector('div');
  if (originalEl) {
    this.renderer.removeStyle(originalEl, 'display');
  }
  if (this.spinnerRef) {
    this.renderer.removeChild(this.el.nativeElement, this.spinnerRef);
    this.spinnerRef = null;
  }
  }

}
