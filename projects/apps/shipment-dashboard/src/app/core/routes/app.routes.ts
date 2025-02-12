import { Route } from '@angular/router';

import { LoginContainer } from '#sd/app/components/login/login.container';
import { PageNotFoundComponent } from '#sd/app/components/page-not-found/page-not-found.page';

// export const appRoutes: Route[] = [
//   {
//     path: '',
//     component: AppWrapperComponent,
//     children: [
//       {
//         path: 'overview',
//         component: OverviewComponent
//       }
//     ]
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
    path: '**',
    component: PageNotFoundComponent
  }
];
