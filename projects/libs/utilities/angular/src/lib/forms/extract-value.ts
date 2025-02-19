import { FormGroup } from '@angular/forms';

/**
 * Returns the casted formGroup value
 */
export function extractFormValue<T>(formGroup: FormGroup<any>): T {
  return formGroup.getRawValue() as T;
}
