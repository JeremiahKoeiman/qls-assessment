import { inject } from '@angular/core';
import { FormControl, FormControlStatus } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { Memoize } from '@qls/utilities/reactive';

import { EMPTY, Observable, Subject, map, merge, shareReplay, switchMap } from 'rxjs';

export abstract class BaseFormValidationHandler {
  protected abstract get control$(): Observable<FormControl>;

  private readonly blurSubject = new Subject<void>();

  private readonly translocoService = inject(TranslocoService);

  public handleBlur(): void {
    this.blurSubject.next();
  }

  @Memoize public get hasValidationErrors$(): Observable<boolean> {
    return this.control$.pipe(
      map(control => !!(control.touched || control.errors)),
      shareReplay(1)
    );
  }

  @Memoize public get errorMessage$(): Observable<string> {
    return merge(this.blur$, this.statusChanges$, this.valueChanges$).pipe(
      switchMap(() => this.control$),
      switchMap(control => {
        if (control?.errors) {
          const errorPropertyName = Object.keys(control.errors)[0];
          return this.translocoService.selectTranslate(
            `VALIDATION.${errorPropertyName.toUpperCase()}`,
            control.errors[errorPropertyName]
          );
        }

        return EMPTY;
      })
    );
  }

  @Memoize private get blur$(): Observable<void> {
    return this.blurSubject.asObservable();
  }

  @Memoize private get statusChanges$(): Observable<FormControlStatus> {
    return this.control$.pipe(
      switchMap(control => control.statusChanges),
      shareReplay(1)
    );
  }

  @Memoize private get valueChanges$(): Observable<any> {
    return this.control$.pipe(
      switchMap(control => control.valueChanges),
      shareReplay(1)
    );
  }
}
