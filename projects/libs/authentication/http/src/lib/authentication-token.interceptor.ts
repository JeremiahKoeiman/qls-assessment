import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, switchMap } from 'rxjs';

import { AuthenticationStateService } from './authentication-state.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationTokenInterceptor implements HttpInterceptor {
  private readonly authenticationStateService = inject(AuthenticationStateService);

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authenticationStateService.currentCredentials$.pipe(
      switchMap(credentials => {
        if (!credentials) {
          return next.handle(req);
        }

        req = req.clone({
          headers: req.headers.set('Authorization', 'Basic ' + credentials)
        });

        return next.handle(req);
      })
    );
  }
}
