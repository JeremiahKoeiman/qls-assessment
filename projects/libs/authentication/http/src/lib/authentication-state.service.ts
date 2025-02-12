import { Injectable } from '@angular/core';
import { Memoize } from '@qls/utilities/reactive';

import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationStateService {
  private readonly currentCredentialsSubject = new Subject<string | undefined>();
  private readonly isAuthenticatedSubject = new Subject<boolean>();

  public setCredentials(hashedCredentials: string): void {
    this.currentCredentialsSubject.next(hashedCredentials);
  }

  public clearCredentials(): void {
    this.currentCredentialsSubject.next(undefined);
  }

  public setIsAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  @Memoize public get currentCredentials$(): Observable<string | undefined> {
    return this.currentCredentialsSubject.asObservable();
  }

  @Memoize public get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
