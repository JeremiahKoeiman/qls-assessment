import { ApplicationConfig } from '@angular/core';

import { provideAuthConfig } from './core/configuration/authentication/authentication-config.provider';
import { provideInternationalizationConfig } from './core/configuration/internationalization/internationalization-config.provider';
import { provideUiConfig } from './core/configuration/ui/ui-config.provider';
import { provideCoreConfig } from './core/core-config.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * App Core Configuration
     */
    provideCoreConfig(),

    /**
     * Authentication
     */
    provideAuthConfig(),

    /**
     * Internationalization
     */
    provideInternationalizationConfig(),

    /**
     * UI
     */
    provideUiConfig()
  ]
};
