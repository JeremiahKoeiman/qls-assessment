import { EnvironmentProviders, Provider, importProvidersFrom } from '@angular/core';

import { AbstractSecurityStorage, AuthModule, DefaultLocalStorageService, StsConfigLoader } from 'angular-auth-oidc-client';

export function provideOidcAuth(): (Provider | EnvironmentProviders)[] {
  return [
    importProvidersFrom(
      AuthModule.forRoot({
        loader: {
          provide: StsConfigLoader,
          useExisting: StsConfigLoader
        }
      })
    ),
    //NOTE: This provider needs to be imported after AuthModule import
    //This provider ensures we use local storage (over session storage)
    //More info: https://angular-auth-oidc-client.com/docs/documentation/custom-storage
    {
      provide: AbstractSecurityStorage,
      useClass: DefaultLocalStorageService
    }
  ];
}
