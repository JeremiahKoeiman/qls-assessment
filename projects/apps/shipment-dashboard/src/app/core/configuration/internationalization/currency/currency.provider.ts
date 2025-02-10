import { DEFAULT_CURRENCY_CODE, Provider } from '@angular/core';

export const provideCurrency = (): Provider => ({
  provide: DEFAULT_CURRENCY_CODE,
  useValue: 'EUR'
});
