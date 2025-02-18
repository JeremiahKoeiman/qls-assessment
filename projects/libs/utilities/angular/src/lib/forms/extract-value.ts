import { FormGroup } from '@angular/forms';

export function extractFormValue<T>(formGroup: FormGroup<any>): T {
  return formGroup.getRawValue() as T;
}
