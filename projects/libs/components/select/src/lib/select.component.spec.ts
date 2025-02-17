import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '@qls/utilities/i18n';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideTransloco({
          config: {
            availableLangs: ['en', 'nl'],
            defaultLang: 'nl',
            fallbackLang: 'nl'
          },
          loader: TranslocoHttpLoader
        })
      ]
    }).compileComponents();
  });

  it('should create select component', () => {
    const fixture = TestBed.createComponent(SelectComponent);
    const app = fixture.componentInstance;
    app.control = new FormControl();
    expect(app).toBeTruthy();
  });

  it('should render with label', () => {
    const fixture = TestBed.createComponent(SelectComponent);
    fixture.componentInstance.label = 'Label';
    fixture.componentInstance.control = new FormControl();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-label')?.textContent).toContain('Label');
  });
});
