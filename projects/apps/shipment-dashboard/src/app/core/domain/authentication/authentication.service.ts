import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthenticationStateService } from '@qls/authentication/http';
import { stringToBase64 } from '@qls/utilities/core';

import { Observable, tap } from 'rxjs';

import { Login } from './models/login.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly httpClient = inject(HttpClient);

  private readonly authenticationStateService = inject(AuthenticationStateService);

  // TODO: fix typing
  public login(credentials: Login): Observable<any> {
    const hashedCredentials = stringToBase64(`${credentials.email}:${credentials.password}`);

    this.authenticationStateService.setCredentials(hashedCredentials);

    return this.httpClient.post('/login', hashedCredentials).pipe(tap(res => console.log('login', res)));
  }
}
