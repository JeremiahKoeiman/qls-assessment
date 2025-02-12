import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, tap } from 'rxjs';

import { AuthenticationStateService } from './authentication-state.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly authenticationStateService = inject(AuthenticationStateService);

  public canActivate(): Observable<boolean> {
    return this.authenticationStateService.isAuthenticated$.pipe(
      tap(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
