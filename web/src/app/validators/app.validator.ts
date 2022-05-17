import { AbstractControl } from '@angular/forms';

export function ValidateEMDPercent(control: AbstractControl) {
    if ( parseFloat(control.value) > 100) {
        return { validEMDPercent: true };
    }
    return null;
}

export function ValidateNoOfDecimal(control: AbstractControl) {
    if ( parseFloat(control.value) > 5) {
        return { validNoOfDecimal: true };
    }
    return null;
}