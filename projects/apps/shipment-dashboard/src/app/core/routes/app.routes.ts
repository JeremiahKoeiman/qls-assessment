import { Route } from '@angular/router';
import { languageScopeResolver } from '@qls/utilities/i18n';

export const appRoutes: Route[] = [
  {
    path: '',
    resolve: {
      translationScope: languageScopeResolver
    },
    loadComponent: () => import('#sd/app/components/app-wrapper/app-wrapper.component').then(c => c.AppWrapperComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('#sd/app/components/overview/overview.container').then(c => c.OverviewComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('#sd/app/components/page-not-found/page-not-found.page').then(c => c.PageNotFoundComponent)
  }
];
