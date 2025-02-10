import { registerLocaleData } from '@angular/common';
import localeNlExtra from '@angular/common/locales/extra/nl';
import localeNl from '@angular/common/locales/nl';
import { LOCALE_ID, Provider } from '@angular/core';

import { setDefaultOptions } from 'date-fns';
import { nl } from 'date-fns/locale';

export const currentLocale = 'nl-NL';

registerLocaleData(localeNl, currentLocale, localeNlExtra);
setDefaultOptions({ locale: nl });

export const provideLocale = (): Provider => ({ provide: LOCALE_ID, useValue: currentLocale });
