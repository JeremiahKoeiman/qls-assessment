import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

import { combineLatest, map, switchMap, take } from 'rxjs';

/**
 * Language Scope Resolver
 * @param scopes 1 Or more scopes that need to be loaded before the route can be loaded
 * @returns
 */
export const languageScopeResolver =
  (...scopes: string[]): ResolveFn<boolean> =>
  () => {
    const translocoService = inject(TranslocoService);
    return translocoService.langChanges$.pipe(
      switchMap(lang =>
        combineLatest(
          scopes.length
            ? scopes.map(scope => translocoService.selectTranslation(`${scope}/${lang}`))
            : [translocoService.selectTranslation(`${lang}`)]
        )
      ),
      map(() => true),
      take(1)
    );
  };
