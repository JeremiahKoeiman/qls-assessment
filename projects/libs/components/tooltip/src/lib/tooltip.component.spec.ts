import { TestBed } from '@angular/core/testing';

import { ToolTipComponent } from './tooltip.component';

describe('ToolTipComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolTipComponent]
    }).compileComponents();
  });

  it('should create input component', () => {
    const fixture = TestBed.createComponent(ToolTipComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
