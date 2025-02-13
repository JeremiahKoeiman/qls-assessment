import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '#sd/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationTokenInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + environment.bearerToken)
    });

    return next.handle(req);
  }
}
