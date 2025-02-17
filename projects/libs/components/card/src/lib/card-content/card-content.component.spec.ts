import { TestBed } from '@angular/core/testing';

import { CardContentComponent } from './card-content.component';

describe('CardContentComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardContentComponent]
    }).compileComponents();
  });

  it('should create card content component', () => {
    const fixture = TestBed.createComponent(CardContentComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
