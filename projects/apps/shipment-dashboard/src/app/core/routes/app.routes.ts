import { Route } from '@angular/router';
import { languageScopeResolver } from '@qls/utilities/i18n';

import { AppWrapperComponent } from '#sd/app/components/app-wrapper/app-wrapper.component';
import { OverviewComponent } from '#sd/app/components/overview/overview.component';
import { PageNotFoundComponent } from '#sd/app/components/page-not-found/page-not-found.page';

export const appRoutes: Route[] = [
  {
    path: '',
    resolve: {
      translationScope: languageScopeResolver
    },
    component: AppWrapperComponent,
    children: [
      {
        path: '',
        component: OverviewComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
