import { TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent]
    }).compileComponents();
  });

  it('should create select component', () => {
    const fixture = TestBed.createComponent(SelectComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render with label', () => {
    const fixture = TestBed.createComponent(SelectComponent);
    fixture.componentInstance.label = 'Label';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-label')?.textContent).toContain('Label');
  });

  it('should render with placeholder', () => {
    const fixture = TestBed.createComponent(SelectComponent);
    fixture.componentInstance.placeholder = 'Placeholder';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const placeholder = compiled.querySelector('mat-select')?.getAttribute('placeholder');
    expect(placeholder).toBe('Placeholder');
  });
});
