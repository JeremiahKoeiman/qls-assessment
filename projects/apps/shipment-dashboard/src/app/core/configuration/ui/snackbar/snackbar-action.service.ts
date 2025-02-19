import { Injectable } from '@angular/core';
import { Memoize } from '@qls/utilities/reactive';

import { Observable, Subject } from 'rxjs';

import { SnackbarAction, SnackbarActionType } from './snackbar.action';

export interface SnackbarEvent {
  action: SnackbarAction;
  navigateTo?: string;
}

@Injectable({ providedIn: 'root' })
export class SnackbarActionService {
  private readonly snackbarEventSubject = new Subject<SnackbarEvent>();

  public emitSuccess(message: string, navigateTo?: string): void {
    this.snackbarEventSubject.next({ action: { type: SnackbarActionType.SUCCESS, message }, navigateTo });
  }

  public emitWarning(message: string, navigateTo?: string): void {
    this.snackbarEventSubject.next({ action: { type: SnackbarActionType.WARNING, message }, navigateTo });
  }

  public emitDanger(message: string, navigateTo?: string): void {
    this.snackbarEventSubject.next({ action: { type: SnackbarActionType.DANGER, message }, navigateTo });
  }

  @Memoize public get snackbar$(): Observable<SnackbarEvent> {
    return this.snackbarEventSubject.asObservable();
  }
}
