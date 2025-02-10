import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Provider } from '@angular/core';

export const provideDateTime = (): Provider => ({
  provide: DATE_PIPE_DEFAULT_OPTIONS,
  useValue: { dateFormat: 'dd-MM-yyyy' }
});
