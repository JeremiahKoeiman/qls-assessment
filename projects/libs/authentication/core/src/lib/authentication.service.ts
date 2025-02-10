import { InjectionToken, Provider, Type, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthOptions, AuthenticatedResult } from './authentication.model';
import { LoginResponse } from './login.model';
import { LogoutAuthOptions } from './logout.model';
import { UserDataResult } from './user.model';

export interface AuthenticationService {
  isAuthenticated$: Observable<AuthenticatedResult>;
  userData$: Observable<UserDataResult>;

  checkAuth(url?: string, configId?: string): Observable<LoginResponse>;
  getAccessToken(): Observable<string>;
  authorize(configId?: string, authOptions?: AuthOptions): void;
  logoff(configId?: string, logoutAuthOptions?: LogoutAuthOptions): Observable<unknown>;
}

const AUTHENTICATION_SERVICE = new InjectionToken<AuthenticationService>('AUTHENTICATION_SERVICE');

export const provideAuthenticationService = (service: Type<AuthenticationService>): Provider => ({
  provide: AUTHENTICATION_SERVICE,
  useClass: service
});

export const injectAuthenticationService = (): AuthenticationService => {
  const authenticationService = inject(AUTHENTICATION_SERVICE, { optional: true });

  if (!authenticationService) {
    throw new Error(
      'No Authentication Service was provided. Please use the `provideAuthenticationService()` from `@qls/authentication/core`.'
    );
  }

  return authenticationService;
};
