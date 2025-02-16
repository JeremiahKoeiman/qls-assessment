import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { provideIcons } from '@ng-icons/core';
import { heroTruck } from '@ng-icons/heroicons/outline';
import { SideMenuItemComponent } from '@qls/components/side-menu-item';

import { Routes } from '#sd/app/core/utilities/constants';

@Component({
  standalone: true,
  selector: 'sd-side-bar',
  templateUrl: './side-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, SideMenuItemComponent, TranslocoPipe],
  viewProviders: [provideIcons({ heroTruck })]
})
export class SideBarComponent {
  public readonly routes = Routes;
}
