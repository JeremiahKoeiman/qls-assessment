import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroBars3 } from '@ng-icons/heroicons/outline';
import { Memoize } from '@qls/utilities/reactive';

import { BehaviorSubject, Observable, Subscription, distinctUntilChanged, filter, shareReplay, startWith, withLatestFrom } from 'rxjs';

import { SideBarComponent } from '../side-bar/side-bar.component';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  standalone: true,
  selector: 'sd-wrapper',
  templateUrl: './app-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, TopBarComponent, SideBarComponent],
  viewProviders: [provideIcons({ heroBars3 })]
})
export class AppWrapperComponent implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);

  private readonly sidebarToggleSubject = new BehaviorSubject<boolean>(false);
  private readonly subscription = new Subscription();

  public ngAfterViewInit(): void {
    this.subscription.add(
      this.router.events
        .pipe(
          filter(e => e instanceof NavigationEnd),
          startWith(this.router),
          withLatestFrom(this.sidebarToggle$)
        )
        .subscribe(sidebarToggle => {
          if (sidebarToggle) {
            this.closeSidebar();
          }
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleSidebar(): void {
    this.sidebarToggleSubject.next(!this.sidebarToggleSubject.value);
  }

  @Memoize public get sidebarToggle$(): Observable<boolean> {
    return this.sidebarToggleSubject.pipe(distinctUntilChanged(), shareReplay(1));
  }

  private closeSidebar(): void {
    this.sidebarToggleSubject.next(false);
  }
}
