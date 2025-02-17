import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchComponent]
    }).compileComponents();
  });

  it('should create switch component', () => {
    const fixture = TestBed.createComponent(SwitchComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render with label', () => {
    const fixture = TestBed.createComponent(SwitchComponent);
    fixture.componentInstance.label = 'Label';
    fixture.componentInstance.control = new FormControl();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-slide-toggle')?.textContent).toContain('Label');
  });
});
