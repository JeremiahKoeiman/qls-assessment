import { TestBed } from '@angular/core/testing';

import { CardFooterComponent } from './card-footer.component';

describe('CardFooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFooterComponent]
    }).compileComponents();
  });

  it('should create card footer component', () => {
    const fixture = TestBed.createComponent(CardFooterComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
