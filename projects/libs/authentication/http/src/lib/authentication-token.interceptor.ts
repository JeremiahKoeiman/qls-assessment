import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { injectAuthenticationService } from '@qls/authentication/core';

import { Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationTokenInterceptor implements HttpInterceptor {
  private readonly authenticationService = injectAuthenticationService();

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authenticationService.getAccessToken().pipe(
      switchMap(token => {
        if (!token) {
          return next.handle(req);
        }

        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });

        return next.handle(req);
      })
    );
  }
}
