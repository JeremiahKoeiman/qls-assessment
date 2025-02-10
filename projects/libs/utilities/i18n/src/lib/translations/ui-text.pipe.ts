import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Injector, OnDestroy, Pipe, PipeTransform, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

import { Observable, isObservable, of, switchMap } from 'rxjs';

import { UiText, isTranslatable } from './translatable-text.model';

@Pipe({
  standalone: true,
  pure: false,
  name: 'uiText'
})
export class UiTextPipe implements PipeTransform, OnDestroy {
  private readonly translocoService = inject(TranslocoService);
  private readonly injector = inject(Injector);
  private readonly asyncPipe = new AsyncPipe(this.injector.get(ChangeDetectorRef));

  public ngOnDestroy(): void {
    this.asyncPipe.ngOnDestroy();
  }

  transform(value: UiText | Observable<UiText> | undefined | null): string {
    if (!value) {
      return '';
    }
    if (isObservable(value)) {
      const translatedLabel = value.pipe(
        switchMap(label => (isTranslatable(label) ? this.translocoService.selectTranslate(label.key, label.params) : of(label)))
      );
      return this.asyncPipe.transform(translatedLabel);
    } else if (isTranslatable(value)) {
      const translatedLabel = this.translocoService.selectTranslate(value.key, value.params);
      return this.asyncPipe.transform(translatedLabel);
    }
    return value;
  }
}
