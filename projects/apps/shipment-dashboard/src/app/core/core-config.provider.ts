import { Provider, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading, withRouterConfig } from '@angular/router';

import { provideHttpConfig } from '#sd/app/core/configuration/http/http-config.provider';

import { provideRoutes } from './routes/routes.provider';

export function provideCoreConfig(): Provider {
  return [
    // Angular
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Routing
    provideRouter([], withRouterConfig({ paramsInheritanceStrategy: 'always' }), withPreloading(PreloadAllModules)),
    provideRoutes(),

    // HTTP
    provideHttpConfig()
  ];
}
