import { TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent]
    }).compileComponents();
  });

  it('should create checkbox component', () => {
    const fixture = TestBed.createComponent(CheckboxComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render with label', () => {
    const fixture = TestBed.createComponent(CheckboxComponent);
    fixture.componentInstance.label = 'Label';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-checkbox')?.textContent).toContain('Label');
  });
});
