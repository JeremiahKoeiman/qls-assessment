import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '@qls/utilities/i18n';

import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaComponent],
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

  it('should create textarea component', () => {
    const fixture = TestBed.createComponent(TextareaComponent);
    const app = fixture.componentInstance;
    app.control = new FormControl();

    expect(app).toBeTruthy();
  });

  it('should render with label', () => {
    const fixture = TestBed.createComponent(TextareaComponent);
    fixture.componentInstance.label = 'Label';
    fixture.componentInstance.control = new FormControl();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-label')?.textContent).toContain('Label');
  });

  it('should render with placeholder', () => {
    const fixture = TestBed.createComponent(TextareaComponent);
    fixture.componentInstance.placeholder = 'Placeholder';
    fixture.componentInstance.control = new FormControl();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const placeholder = compiled.querySelector('textarea')?.getAttribute('placeholder');
    expect(placeholder).toBe('Placeholder');
  });

  it('should call handleBlur on blur event', () => {
    const fixture = TestBed.createComponent(TextareaComponent);
    fixture.componentInstance.control = new FormControl();
    fixture.componentInstance.handleBlur = jasmine.createSpy();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('textarea')?.dispatchEvent(new Event('blur'));
    expect(fixture.componentInstance.handleBlur).toHaveBeenCalled();
  });
});
