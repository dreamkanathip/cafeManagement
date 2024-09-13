// validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailDomainValidator(allowedDomains: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // ถ้าไม่มีค่าให้ผ่าน
    }

    const email = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1).toLowerCase();

    return allowedDomains.includes(domain) ? null : { invalidDomain: true };
  };
}
