import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    if (!control.value) {
      return null;
    }

    const data = new Date(control.value);

    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    data.setHours(0, 0, 0, 0);

    if (data > hoje) {

      return {

        dataFutura: true

      };

    }

    return null;

  };

}