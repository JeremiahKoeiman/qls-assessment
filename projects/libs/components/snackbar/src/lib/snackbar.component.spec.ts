import { TestBed } from '@angular/core/testing';

import { SnackbarComponent } from './snackbar.component';

describe('SnackbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarComponent]
    }).compileComponents();
  });

  it('should create snackbar component', () => {
    const fixture = TestBed.createComponent(SnackbarComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render with message', () => {
    const message = 'This is a snackbar';
    const fixture = TestBed.createComponent(SnackbarComponent);
    fixture.componentInstance.message = message;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.textContent).toContain(message);
  });

  it('should render with success alert style', () => {
    const fixture = TestBed.createComponent(SnackbarComponent);
    fixture.componentInstance.alertStyle = 'success';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tailwindClasses = compiled.querySelector('div')?.getAttribute('class');
    expect(tailwindClasses).toContain('bg-fill-success');
  });

  it('should render with warning alert style', () => {
    const fixture = TestBed.createComponent(SnackbarComponent);
    fixture.componentInstance.alertStyle = 'warning';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tailwindClasses = compiled.querySelector('div')?.getAttribute('class');
    expect(tailwindClasses).toContain('bg-fill-warning');
  });

  it('should render with danger alert style', () => {
    const fixture = TestBed.createComponent(SnackbarComponent);
    fixture.componentInstance.alertStyle = 'danger';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tailwindClasses = compiled.querySelector('div')?.getAttribute('class');
    expect(tailwindClasses).toContain('bg-fill-danger');
  });
});
