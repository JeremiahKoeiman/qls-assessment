import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroBars3 } from '@ng-icons/heroicons/outline';
import { Memoize } from '@qls/utilities/reactive';

import { BehaviorSubject, Observable, distinctUntilChanged, shareReplay } from 'rxjs';

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
export class AppWrapperComponent {
  private readonly sidebarToggleSubject = new BehaviorSubject<boolean>(false);

  public toggleSidebar(): void {
    this.sidebarToggleSubject.next(!this.sidebarToggleSubject.value);
  }

  public closeSidebar(): void {
    this.sidebarToggleSubject.next(false);
  }

  @Memoize public get sidebarToggle$(): Observable<boolean> {
    return this.sidebarToggleSubject.pipe(distinctUntilChanged(), shareReplay(1));
  }
}
