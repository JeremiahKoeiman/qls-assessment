import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, map, shareReplay } from 'rxjs';

import { TooltipType } from './tooltip.model';

export type TooltipPosition = 'top' | 'bottom' | 'right' | 'left';

@Component({
  standalone: true,
  imports: [CommonModule, OverlayModule, PortalModule],
  selector: 'qls-tooltip',
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolTipComponent {
  /**
   * The type of tooltip
   */
  @Input() public tooltipType: TooltipType = 'light';

  @Memoize public get tooltipClasses$(): Observable<string> {
    return observeProperty(this as ToolTipComponent, 'tooltipType').pipe(
      map(type => {
        const defaultClasses = 'max-w-[21.5rem] rounded-md px-6 py-2';
        return `${defaultClasses} ${this.mapTooltipTypeToColorClasses(type)}`;
      }),
      shareReplay(1)
    );
  }

  private mapTooltipTypeToColorClasses(type: TooltipType): string {
    switch (type) {
      case 'light':
        return 'bg-white text-primary';
      case 'dark':
        return 'bg-surface-tertiary text-white';
      case 'info':
        return 'bg-fill-info text-white';
      default:
        return 'bg-white text-primary';
    }
  }
}
