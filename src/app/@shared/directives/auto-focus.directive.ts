import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[autoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    });
  }
}
