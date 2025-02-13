import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationStateService } from '@qls/authentication/http';

import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly authenticationStateService = inject(AuthenticationStateService);

  public canActivate(): Observable<boolean> {
    return this.authenticationStateService.isAuthenticated$.pipe(
      // startWith(true),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          console.log('isAuthenticated', true);
          this.router.navigate(['/yeet']); // TODO: should be '/dashboard'
          return false;
        }

        console.log('isAuthenticated', false);
        return false;
      })
    );
  }
}
