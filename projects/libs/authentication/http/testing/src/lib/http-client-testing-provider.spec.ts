import { ExistingProvider, Provider, ValueProvider } from '@angular/core';

import { provideHttpClientTesting } from './http-client-testing-provider';

type ProviderAnyArray = Extract<Provider, any[]>;

const hasUseExisting = (provider: Provider): provider is ExistingProvider => (provider as ExistingProvider).useExisting !== undefined;
const hasUseValue = (provider: Provider): provider is ValueProvider => (provider as ValueProvider).useValue !== undefined;

describe('provideHttpClientTesting', () => {
  let httpClientTestingProviders: ProviderAnyArray;
  let defaultHttpClientProvider: Provider;
  let defaultHttpClientProviderHasExisting: boolean;
  let defaultHttpClientProviderHasUseValue: boolean;

  beforeEach(() => {
    httpClientTestingProviders = provideHttpClientTesting() as ProviderAnyArray;

    // JEX Default Http Client is located at index 2
    defaultHttpClientProvider = httpClientTestingProviders[2];

    // Has useExisting or useValue
    defaultHttpClientProviderHasExisting = defaultHttpClientProvider ? hasUseExisting(defaultHttpClientProvider) : false;
    defaultHttpClientProviderHasUseValue = defaultHttpClientProvider ? hasUseValue(defaultHttpClientProvider) : false;
  });

  it('should contain all providers for testing with JEX Authenticated HttpClient', () => {
    // Expect 3 Providers: providedHttpClient, providedHttpClientTesting & DEFAULT_HTTP_CLIENT provider
    expect(httpClientTestingProviders.length).toBe(3);

    // Expect DEFAULT_HTTP_CLIENT provider to contain `useExisting`
    expect(defaultHttpClientProviderHasExisting).toBeTrue();

    // Expect DEFAULT_HTTP_CLIENT provider NOT to contain `useValue` fallback in case HttpClient provider is not found
    expect(defaultHttpClientProviderHasUseValue).toBeFalse();
  });
});
