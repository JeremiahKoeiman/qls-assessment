import { Route } from '@angular/router';

import { AppWrapperComponent } from '#sd/app/components/app-wrapper/app-wrapper.component';
import { OverviewComponent } from '#sd/app/components/overview/overview.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppWrapperComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent
      }
    ]
  }
];
