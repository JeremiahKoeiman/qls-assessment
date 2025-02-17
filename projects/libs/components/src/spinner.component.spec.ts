import { TestBed } from '@angular/core/testing';

import { SpinnerComponent } from '../spinner';

describe('SpinnerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent]
    }).compileComponents();
  });

  it('should create input component', () => {
    const fixture = TestBed.createComponent(SpinnerComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
