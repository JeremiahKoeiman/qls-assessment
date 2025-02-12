import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

import { BaseUrlInterceptor } from './base-url.interceptor';

export const provideInterceptors = (): Provider => ({
  provide: HTTP_INTERCEPTORS,
  useClass: BaseUrlInterceptor,
  multi: true
});
