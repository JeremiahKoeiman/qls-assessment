import { provideHttpClient } from '@angular/common/http';
import { Provider } from '@angular/core';

import { ForkableHttpClient, httpClient } from 'ngx-forkable-http-client';

import { AuthenticationTokenInterceptor } from './authentication-token.interceptor';

/**
 * AuthenticatedHttpClient
 * @description Injectable Token to get the Authenticated HttpClient
 */
export abstract class AuthenticatedHttpClient extends ForkableHttpClient {}

/**
 * HttpClient
 * @description Injectable Token to get the Anonymous HttpClient
 */
export class AnonymousHttpClient extends ForkableHttpClient {}

/**
 * Provide Authenticated HttpClient
 * @description Will attach the Authentication header with bearer token retrieved from the Authentication Service.
 * @returns HttpClient Provider that performs authenticated requests
 */
export const provideHttpClients = (): Provider => [
  provideHttpClient(),
  {
    provide: AuthenticatedHttpClient,
    useFactory: httpClient().with(AuthenticationTokenInterceptor)
  },
  {
    provide: AnonymousHttpClient,
    useFactory: httpClient()
  }
];
