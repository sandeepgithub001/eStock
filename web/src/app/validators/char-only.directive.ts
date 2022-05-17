import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appNotAllowOnlySpace]'
})
export class NotAllowOnlySpaceDirective {
    // Allow decimal numbers and negative values
    private regex: RegExp = new RegExp(/^[a-zA-Z0-9]+(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$/g);
    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

    constructor(private el: ElementRef) {
    }
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        // console.log(this.el.nativeElement.value);
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        if (event.which == 32 && !(this.el.nativeElement.value.toString().trim()).length)
            event.preventDefault();
    }
}