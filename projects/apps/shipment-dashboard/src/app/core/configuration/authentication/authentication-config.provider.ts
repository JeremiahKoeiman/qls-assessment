import { EnvironmentProviders, Provider } from '@angular/core';
import { provideHttpClients } from '@qls/authentication/http';

export function provideAuthConfig(): (Provider | EnvironmentProviders)[] {
  return [
    // HttpClients and Interceptors
    provideHttpClients()
  ];
}
