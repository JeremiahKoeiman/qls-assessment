import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, map, shareReplay } from 'rxjs';

import { IconSize } from './icon.model';

@Component({
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'qls-icon',
  templateUrl: './icon.component.html'
})
export class IconComponent {
  /**
   * The name of the icon
   */
  @Input({ required: true }) public icon!: string;

  /**
   * Define the size of the icon. This defaults to the current font size.
   */
  @Input() public size: IconSize = 'lg';

  @Memoize public get iconSize$(): Observable<string> {
    return observeProperty(this as IconComponent, 'size').pipe(
      map(size => mapSizeToIconSize(size)),
      shareReplay(1)
    );
  }
}

const mapSizeToIconSize = (size: IconSize): string => {
  switch (size) {
    case 'sm':
      return '.75rem';
    case 'md':
      return '1rem';
    case 'lg':
    default:
      return '1.25rem';
  }
};
