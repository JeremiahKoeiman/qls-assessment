import { TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent]
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
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-label')?.textContent).toContain('Label');
  });

  it('should render with placeholder', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentInstance.placeholder = 'Placeholder';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const placeholder = compiled.getAttribute('placeholder');
    expect(placeholder).toBe('Placeholder');
  });

  it('should render call handleBlur on blur event', () => {
    const fixture = TestBed.createComponent(InputComponent);
    fixture.componentInstance.handleBlur = jest.fn();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('input')?.blur();
    expect(fixture.componentInstance.handleBlur).toHaveBeenCalled();
  });
});
