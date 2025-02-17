import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from '@qls/utilities/i18n';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
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

  it('should create input component', () => {
    const fixture = TestBed.createComponent(InputComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render with label', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentInstance.label = 'Label';
    fixture.componentInstance.control = new FormControl();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-label')?.textContent).toContain('Label');
  });

  it('should render with placeholder', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentInstance.placeholder = 'Placeholder';
    fixture.componentInstance.control = new FormControl();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const placeholder = compiled.querySelector('input')?.getAttribute('placeholder');
    expect(placeholder).toBe('Placeholder');
  });

  it('should call handleBlur on blur event', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentInstance.control = new FormControl();
    fixture.componentInstance.handleBlur = jasmine.createSpy();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('input')?.dispatchEvent(new Event('blur'));
    expect(fixture.componentInstance.handleBlur).toHaveBeenCalled();
  });
});
