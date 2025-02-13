import { Route } from '@angular/router';
import { languageScopeResolver } from '@qls/utilities/i18n';

import { AppWrapperComponent } from '#sd/app/components/app-wrapper/app-wrapper.component';
import { LoginContainer } from '#sd/app/components/login/login.container';
import { OverviewComponent } from '#sd/app/components/overview/overview.component';
import { PageNotFoundComponent } from '#sd/app/components/page-not-found/page-not-found.page';

// export const appRoutes: Route[] = [
//   {
//     path: '',
//     resolve: {
//       translationScope: languageScopeResolver
//     },
//     component: LoginContainer,
//     children: [
//       {
//         path: '',
//         component: AppWrapperComponent,
//         children: [
//           {
//             path: 'overview',
//             component: OverviewComponent
//           }
//         ],
//         canActivate: [AuthenticationGuard]
//       }
//     ]
//   },
//   {
//     path: '**',
//     component: PageNotFoundComponent
//   }
// ];

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginContainer
  },
  {
    path: '',
    resolve: {
      translationScope: languageScopeResolver
    },
    component: AppWrapperComponent,
    // canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'dashboard',
        component: OverviewComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
