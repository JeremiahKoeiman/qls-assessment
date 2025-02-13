import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { stringToBase64 } from '@qls/utilities/core';

import { EMPTY, Observable } from 'rxjs';

import { AuthenticationStateService } from './authentication-state.service';
import { Login } from './models/login.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly authenticationStateService = inject(AuthenticationStateService);

  // TODO: fix typing
  public login(credentials: Login): Observable<any> {
    console.log('vefbhvfkdj');
    const hashedCredentials = stringToBase64(`${credentials.email}:${credentials.password}`);

    console.log(hashedCredentials);

    // this.authenticationStateService.setCredentials(hashedCredentials);

    this.authenticationStateService.setIsAuthenticated(true);

    this.router.navigate(['/dashboard']);

    return EMPTY;
    // return this.httpClient.post('/login', hashedCredentials).pipe(tap(res => console.log('login', res)));
  }
}
