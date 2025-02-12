import { Provider } from '@angular/core';

import { provideInterceptors } from './interceptors/interceptor-config.provider';

export function provideHttpConfig(): Provider {
  return [
    /**
     * Interceptors
     */
    provideInterceptors()
  ];
}
