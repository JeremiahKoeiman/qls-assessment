import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiTextPipe } from '@qls/utilities/i18n';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, map, shareReplay } from 'rxjs';

import { ButtonType } from './button.model';

@Component({
  selector: 'qls-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  imports: [CommonModule, UiTextPipe]
})
export class ButtonComponent {
  /**
   * The label for the button
   */
  @Input({ required: true }) public label: string;

  /**
   * The type of button used. Dictates the button color
   */
  @Input() public buttonType: ButtonType = 'primary';

  /**
   * Whether the button is disabled
   */
  @Input() public disabled = false;

  @Memoize public get buttonClasses$(): Observable<string> {
    return this.buttonType$.pipe(
      map(buttonType => {
        const defaultClasses =
          'w-full text-md text-white rounded-md flex items-center justify-center whitespace-nowrap select-none transition-colors duration-75 px-4 py-2';

        return `${defaultClasses} ${this.getButtonColor(buttonType)}`;
      })
    );
  }

  /**
   * The reason this method uses a switch is because tailwind doesn't support template strings.
   * Example: if I do this: `bg-fill-${this.buttonType}`, Tailwind won't recognise this.
   * This is because Tailwind needs all of it's classes to be defined during build time
   * and using template strings means that it's value is determined during run time, which is too late
   */
  private getButtonColor(buttonType: ButtonType): string {
    switch (buttonType) {
      case 'primary':
        return 'bg-fill-primary hover:bg-fill-primary-hover';
      case 'success':
        return 'bg-fill-success hover:bg-fill-success-hover';
      case 'danger':
        return 'bg-fill-danger hover:bg-fill-danger-hover';
      case 'warning':
        return 'bg-fill-warning hover:bg-fill-warning-hover';
      case 'info':
        return 'bg-fill-info hover:bg-fill-info-hover';
      default:
        return 'bg-fill-primary hover:bg-fill-primary-hover'; // same as primary
    }
  }

  @Memoize private get buttonType$(): Observable<ButtonType> {
    return observeProperty(this as ButtonComponent, 'buttonType').pipe(shareReplay(1));
  }
}
