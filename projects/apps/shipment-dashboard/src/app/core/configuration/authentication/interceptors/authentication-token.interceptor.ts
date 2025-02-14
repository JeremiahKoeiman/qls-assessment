import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import { environment } from '#sd/environment';

export const authenticationTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authenticatedReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + environment.bearerToken)
  });

  return next(authenticatedReq);
};
