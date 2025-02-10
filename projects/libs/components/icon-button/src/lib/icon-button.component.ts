import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, map, shareReplay } from 'rxjs';

import { IconSize } from './icon-button.model';

@Component({
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'qls-icon-button',
  templateUrl: './icon-button.component.html'
})
export class IconButtonComponent {
  /**
   * The name of the icon
   */
  @Input({ required: true }) public icon!: string;

  /**
   * Whether the icon button should be disabled
   */
  @Input() disabled = false;

  /**
   * Define the size of the icon. This defaults to the current font size.
   */
  @Input() public size: IconSize = 'lg';

  @Memoize public get iconSize$(): Observable<string> {
    return observeProperty(this as IconButtonComponent, 'size').pipe(
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
      return '1.25rem';
    case 'xl':
      return '1.5rem';
    default:
      return '1.25rem';
  }
};
