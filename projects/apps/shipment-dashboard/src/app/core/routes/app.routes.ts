import { Route } from '@angular/router';

import { Routes } from '../utilities/constants';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('#sd/app/features/components/app-wrapper/app-wrapper.component').then(c => c.AppWrapperComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('#sd/app/features/components/welcome/welcome.component').then(c => c.WelcomeComponent)
      },
      {
        path: `${Routes.SHIPMENTS}`,
        loadComponent: () => import('#sd/app/features/containers/overview/overview.container').then(c => c.OverviewComponent)
      },
      {
        path: `${Routes.SHIPMENTS}/${Routes.CREATE}`,
        loadComponent: () =>
          import('#sd/app/features/containers/create-shipment/create-shipment.container').then(c => c.CreateShipmentsContainer)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('#sd/app/features/pages/page-not-found/page-not-found.page').then(c => c.PageNotFoundComponent)
  }
];
