import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '#sd/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private readonly pathsToIgnore = ['assets'];

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.pathsToIgnore.some(path => req.url.includes(path))) {
      return next.handle(req);
    }

    const apiRequest = req.clone({ url: `${environment.apiBaseUrl}/${req.url}` });
    return next.handle(apiRequest);
  }
}
