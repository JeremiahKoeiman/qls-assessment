import { TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();
  });

  it('should create button component', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should render with label', () => {
    const label = 'Label';
    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;

    component.label = label;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span[data-test="button-label"]')?.textContent).toBe(label);
  });
});
