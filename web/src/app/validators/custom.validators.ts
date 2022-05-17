import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonService } from '../Services/common.service';

export function emailDomain(control: AbstractControl): { [key: string]: any } | null {
    const email: string = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);
    if (email === '' || domain.toLowerCase() === 'onebcg.com') {
        return null;
    } else {
        return { 'emailDomain': true };
    }
}

export function dateInputValidation(control: AbstractControl): { [key: string]: any } | null {
    const _date: string = control.value;
    const domain = _date.substring(_date.lastIndexOf('-') + 1);
    if (_date != '') {
        return null;
    } else {
        return { 'dateInputValidation': true };
    }
}

export class ValidateEmployeeCodeNotTaken {
    static createValidator(commonService: CommonService) {
        return (control: AbstractControl) => {
            return commonService.checkEmployeeCodeNotTaken(control.value)
                .subscribe(res => {
                    console.log("employeeCodeTaken", res.Data ? null : { employeeCodeTaken: true })
                    return res.Data ? null : { employeeCodeTaken: true };
                    // return res.Data ? { 'employeeCodeTaken': true } : null;
                    // return res.Data ? { 'employeeCodeTaken': true } : null;
                });
        };
    }
}

export class ValidateEmailNotTaken {
    static createValidator(employeeId, commonService: CommonService) {
        return (control: AbstractControl) => {
            return commonService.checkEmailNotTaken(employeeId, control.value)
                .subscribe(res => {
                    return res.Data ? null : { 'emailTaken': true };
                });
        };
    }
}