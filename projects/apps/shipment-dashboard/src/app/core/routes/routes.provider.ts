import { Provider } from '@angular/core';
import { ROUTES } from '@angular/router';

import { appRoutes } from './app.routes';

export const provideRoutes = (): Provider => ({
  provide: ROUTES,
  useValue: appRoutes,
  multi: true
});
