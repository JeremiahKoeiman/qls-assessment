import { EnvironmentProviders, Provider, isDevMode } from '@angular/core';
import { DefaultTranspiler, provideTransloco, provideTranslocoTranspiler } from '@jsverse/transloco';
import { provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';

import { provideCurrency } from './currency/currency.provider';
import { provideDateTime } from './date-time/date-time.provider';
import { TranslocoHttpLoader } from './translations';
import { provideLocale } from './translations/locale.provider';

export function provideInternationalizationConfig(): Provider | EnvironmentProviders {
  return [
    // Translations
    provideTransloco({
      config: {
        availableLangs: ['nl', 'en'],
        defaultLang: 'nl',
        fallbackLang: 'nl',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode()
      },
      loader: TranslocoHttpLoader
    }),
    provideTranslocoPersistLang({
      storage: {
        useValue: localStorage
      }
    }),
    provideTranslocoTranspiler(DefaultTranspiler),

    // i18n Defaults
    provideDateTime(),
    provideLocale(),
    provideCurrency()
  ];
}
