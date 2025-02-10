import { HttpClient, HttpHandler, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting as provideAngularHttpClientTesting } from '@angular/common/http/testing';
import { Provider } from '@angular/core';
import { AnonymousHttpClient, AuthenticatedHttpClient } from '@qls/authentication/http';

const HTTP_CLIENT_CONTROLLER = 'HttpClient';

const findHttpClientClass = (providedHttpClient: any): HttpClient | undefined =>
  (providedHttpClient.ɵproviders ?? []).flat().find(provider => HTTP_CLIENT_CONTROLLER === provider.name);

/**
 * Provide Http Client for testing
 * @description This function provides the correct `HttpClient` providers for testing.
 * Compatible with `HttpTestingController` testing.
 * @returns Providers needed for testing with JEX AuthenticatedHttpClient
 */
export const provideHttpClientTesting = (): Provider => {
  const handler = {} as HttpHandler;
  const httpClient = new HttpClient(handler);
  const providedHttpClient = provideHttpClient();
  const providedHttpClientTesting = provideAngularHttpClientTesting();
  const httpClientClass = findHttpClientClass(providedHttpClient);

  return [
    providedHttpClient,
    providedHttpClientTesting,
    {
      provide: AuthenticatedHttpClient,
      ...(httpClientClass ? { useExisting: httpClientClass } : { useValue: httpClient })
    },
    {
      provide: AnonymousHttpClient,
      ...(httpClientClass ? { useExisting: httpClientClass } : { useValue: httpClient })
    }
  ];
};
