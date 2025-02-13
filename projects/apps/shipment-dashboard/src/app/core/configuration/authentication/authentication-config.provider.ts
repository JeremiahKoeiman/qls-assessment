import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';

import { AuthenticationTokenInterceptor } from '#sd/app/core/configuration/authentication/interceptors/authentication-token.interceptor';

export function provideAuthConfig(): (Provider | EnvironmentProviders)[] {
  return [
    // HttpClients and Interceptors
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationTokenInterceptor,
      multi: true
    }
  ];
}
