import { TestBed } from '@angular/core/testing';

import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaComponent]
    }).compileComponents();
  });

  it('should create textarea component', () => {
    const fixture = TestBed.createComponent(TextareaComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render with label', () => {
    const fixture = TestBed.createComponent(TextareaComponent);
    fixture.componentInstance.label = 'Label';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-label')?.textContent).toContain('Label');
  });

  it('should render with placeholder', () => {
    const fixture = TestBed.createComponent(TextareaComponent);
    fixture.componentInstance.placeholder = 'Placeholder';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const placeholder = compiled.getAttribute('placeholder');
    expect(placeholder).toBe('Placeholder');
  });

  it('should render call handleBlur on blur event', () => {
    const fixture = TestBed.createComponent(TextareaComponent);
    fixture.componentInstance.handleBlur = jest.fn();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('input')?.blur();
    expect(fixture.componentInstance.handleBlur).toHaveBeenCalled();
  });
});
