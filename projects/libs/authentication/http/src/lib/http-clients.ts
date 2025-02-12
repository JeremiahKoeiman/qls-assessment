import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { Provider } from '@angular/core';

import { AuthenticationTokenInterceptor } from './authentication-token.interceptor';

/**
 * Provide HttpClient
 * @description Will attach the Authentication header with basic token retrieved from the Credentials Service.
 * @returns HttpClient Provider that performs authenticated requests
 */
export const provideHttpClients = (): Provider => [
  provideHttpClient(),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationTokenInterceptor,
    multi: true
  }
];
