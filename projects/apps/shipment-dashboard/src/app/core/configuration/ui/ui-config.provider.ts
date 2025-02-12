import { Provider } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNgIconsConfig } from '@ng-icons/core';

export function provideUiConfig(): Provider {
  return [
    provideAnimations(),

    provideNgIconsConfig({
      size: '1.25rem'
    })
  ];
}
