import { Provider, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNgIconLoader, provideNgIconsConfig } from '@ng-icons/core';
import { AnonymousHttpClient } from '@qls/authentication/http';

export function provideUiConfig(): Provider {
  return [
    provideAnimations(),

    provideNgIconsConfig({
      size: '1.25rem'
    }),

    provideNgIconLoader(name => {
      const http = inject(AnonymousHttpClient);
      return http.get(`/assets/icons/${name}.svg`, { responseType: 'text' });
    })
  ];
}
