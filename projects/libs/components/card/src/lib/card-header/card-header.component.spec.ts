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

  it('should render with heading', () => {
    const heading = 'Heading';
    const fixture = TestBed.createComponent(CardHeaderComponent);
    const component = fixture.componentInstance;

    component.heading = heading;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h4')?.textContent).toBe(heading);
  });
});
