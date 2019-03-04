import { Directive, HostBinding, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {

    constructor (private renderer: Renderer2,
                private element: ElementRef) {}

    @HostBinding('class.show') isOpen = false;

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
        this.isOpen ?
            this.element.nativeElement.querySelector('.dropdown-menu').classList.add('show') :
            this.element.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
      }
}
