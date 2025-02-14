import { TestBed } from '@angular/core/testing';

import { Radio, RadioGroupComponent } from './radio-group.component';

const radios: Radio<number>[] = [
  { label: 'Radio 1', value: 1 },
  { label: 'Radio 2', value: 2 },
  { label: 'Radio 3', value: 3 }
];

describe('RadioGroupComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupComponent]
    }).compileComponents();
  });

  it('should create checkbox component', () => {
    const fixture = TestBed.createComponent(RadioGroupComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render with radios', () => {
    const fixture = TestBed.createComponent(RadioGroupComponent);
    fixture.componentInstance.radios = radios;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('mat-radio-button')?.length).toBe(radios.length);
  });

  it('should render with radios and display label', () => {
    const fixture = TestBed.createComponent(RadioGroupComponent);
    fixture.componentInstance.radios = radios;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('mat-radio-button')[0]?.textContent).toBe(radios[0].label);
  });
});
