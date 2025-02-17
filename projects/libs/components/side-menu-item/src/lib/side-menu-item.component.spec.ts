import { TestBed } from '@angular/core/testing';

import { SideMenuItemComponent } from './side-menu-item.component';

describe('SideMenuItemComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuItemComponent]
    }).compileComponents();
  });

  it('should create side menu item component', () => {
    const fixture = TestBed.createComponent(SideMenuItemComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should contain a label', () => {
    const label = 'Label';
    const fixture = TestBed.createComponent(SideMenuItemComponent);
    fixture.componentInstance.label = label;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain(label);
  });
});
