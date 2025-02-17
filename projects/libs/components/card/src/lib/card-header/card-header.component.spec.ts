import { TestBed } from '@angular/core/testing';

import { CardHeaderComponent } from './card-header.component';

describe('CardHeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHeaderComponent]
    }).compileComponents();
  });

  it('should create card header component', () => {
    const fixture = TestBed.createComponent(CardHeaderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
