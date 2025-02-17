import { TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';

import { PaginationComponent } from './card.component';

describe('PaginationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    }).compileComponents();
  });

  it('should create input component', () => {
    const fixture = TestBed.createComponent(PaginationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should emit pageChange event', () => {
    const mockEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 1,
      length: 1200
    };
    const fixture = TestBed.createComponent(PaginationComponent);
    fixture.componentInstance.length = 1200;
    fixture.componentInstance.pageSize = 1;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('mat-paginator')?.dispatchEvent(new CustomEvent('page'));
    expect(fixture.componentInstance.pageChange.emit).toHaveBeenCalledWith(mockEvent);
  });
});
