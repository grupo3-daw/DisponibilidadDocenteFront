import { ValidatorFn } from '@angular/forms';

export class ControlForm {
  name: string;
  value?: string | number;
  error?: string;
  validators: Array<ValidatorFn>;
}
