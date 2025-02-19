import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { provideIcons } from '@ng-icons/core';
import { heroBars3 } from '@ng-icons/heroicons/outline';
import { Memoize } from '@qls/utilities/reactive';

import {
  BehaviorSubject,
  Observable,
  Subscription,
  distinctUntilChanged,
  filter,
  shareReplay,
  startWith,
  withLatestFrom
} from 'rxjs';

import { SnackbarActionService } from '#sd/app/core/configuration/ui/snackbar/snackbar-action.service';

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
export class AppWrapperComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly matSnackbar = inject(MatSnackBar);
  private readonly snackbarActionService = inject(SnackbarActionService);
  private readonly translocoService = inject(TranslocoService);

  private readonly sidebarToggleSubject = new BehaviorSubject<boolean>(false);
  private readonly subscription = new Subscription();

  public ngOnInit(): void {
    this.closeSidebarOnNavigationEnd();
    this.showSnackbarOnSnackbarAction();
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

  private showSnackbarOnSnackbarAction(): void {
    this.subscription.add(
      this.snackbarActionService.snackbar$.subscribe(({ action, navigateTo }) => {
        this.matSnackbar.open(this.translocoService.translate(action.message), undefined, {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          panelClass: `${action.type}-snackbar`
        });

        if (navigateTo) {
          this.router.navigate([navigateTo]);
        }
      })
    );
  }

  private closeSidebarOnNavigationEnd(): void {
    this.subscription.add(
      this.router.events
        .pipe(
          filter(e => e instanceof NavigationEnd),
          startWith(this.router),
          withLatestFrom(this.sidebarToggle$)
        )
        .subscribe(sidebarToggle => {
          if (sidebarToggle) {
            this.sidebarToggleSubject.next(false);
          }
        })
    );
  }
}
