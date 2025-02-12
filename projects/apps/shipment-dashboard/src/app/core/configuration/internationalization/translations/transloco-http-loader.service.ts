import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private cache$: Observable<Translation> | null = null;
  private cachedLang: string | null = null;

  private readonly http = inject(HttpClient);

  public getTranslation(lang: string): Observable<Translation> {
    if (!this.cache$ || this.cachedLang !== lang) {
      this.cache$ = this.http.get<Translation>(`./assets/i18n/${lang}.json?v=${Date.now()}`).pipe(shareReplay(1));
      this.cachedLang = lang;
    }
    return this.cache$;
  }
}
