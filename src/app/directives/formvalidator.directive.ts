import { AbstractControl, ValidatorFn } from '@angular/forms';

export function stringValidator(stringRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = stringRe.test(control.value);
    return forbidden ? { string: { value: control.value } } : null;
  };
}