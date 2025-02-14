import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders } from '@angular/core';

import { authenticationTokenInterceptor } from '#sd/app/core/configuration/authentication/interceptors/authentication-token.interceptor';

export function provideAuthConfig(): EnvironmentProviders[] {
  return [
    // HttpClients and Interceptors
    provideHttpClient(withInterceptors([authenticationTokenInterceptor]))
  ];
}
