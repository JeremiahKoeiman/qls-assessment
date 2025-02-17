import { TestBed } from '@angular/core/testing';

import { IconButtonComponent } from './icon-button.component';

describe('IconButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButtonComponent]
    }).compileComponents();
  });

  it('should create icon button component', () => {
    const fixture = TestBed.createComponent(IconButtonComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
