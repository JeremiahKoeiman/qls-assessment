import { EnvironmentProviders, Provider } from '@angular/core';
import { provideAuthenticationService } from '@qls/authentication/core';
import { provideHttpClients } from '@qls/authentication/http';

import { OidcSecurityService } from 'angular-auth-oidc-client';

import { provideOidcAuth } from './oidc/oidc.provider';

export function provideAuthConfig(): (Provider | EnvironmentProviders)[] {
  return [
    // Authenticated and Anonymous HttpClients
    provideHttpClients(),

    // Authentication
    provideOidcAuth(),

    // Provide compatible Authentication Service
    provideAuthenticationService(OidcSecurityService)
  ];
}
