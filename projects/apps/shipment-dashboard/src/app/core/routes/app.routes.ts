import { Route } from '@angular/router';
import { languageScopeResolver } from '@qls/utilities/i18n';

export const appRoutes: Route[] = [
  {
    path: '',
    resolve: {
      translationScope: languageScopeResolver
    },
    loadComponent: () => import('#sd/app/features/components/app-wrapper/app-wrapper.component').then(c => c.AppWrapperComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('#sd/app/features/components/welcome/welcome.component').then(c => c.WelcomeComponent)
      },
      {
        path: 'shipments',
        loadComponent: () => import('#sd/app/features/containers/overview/overview.container').then(c => c.OverviewComponent)
      },
      {
        path: 'shipments/:id',
        loadComponent: () => import('#sd/app/features/containers/detail/detail.container').then(c => c.DetailComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('#sd/app/features/pages/page-not-found/page-not-found.page').then(c => c.PageNotFoundComponent)
  }
];

// ---------------
// export const appRoutes: Route[] = [
//   {
//     path: '',
//     resolve: {
//       translationScope: languageScopeResolver
//     },
//     redirectTo: 'shipments',
//     pathMatch: 'full'
//   },
//   {
//     path: 'shipments',
//     loadComponent: () => import('#sd/app/features/components/app-wrapper/app-wrapper.component').then(c => c.AppWrapperComponent),
//     children: [
//       {
//         path: '',
//         loadComponent: () => import('#sd/app/features/containers/overview/overview.container').then(c => c.OverviewComponent)
//       }
//     ]
//   },
//   {
//     path: 'shipments/:id',
//     loadComponent: () => import('#sd/app/features/containers/detail/detail.container').then(c => c.DetailComponent)
//   },
//   {
//     path: '**',
//     loadComponent: () => import('#sd/app/features/pages/page-not-found/page-not-found.page').then(c => c.PageNotFoundComponent)
//   }
// ];
