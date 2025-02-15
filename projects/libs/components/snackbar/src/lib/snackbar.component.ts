import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { slideInOnEnterAnimation, slideOutOnLeaveAnimation } from '@qls/utilities/angular';

import { AlertStyle } from './snackbar.model';

@Component({
  selector: 'qls-snackbar',
  templateUrl: './snackbar.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInOnEnterAnimation(), slideOutOnLeaveAnimation()]
})
export class SnackbarComponent {
  /**
   * The message to display
   */
  @Input({ required: true }) public message: string;

  /**
   * The style of the alert
   */
  @Input({ required: true }) public alertStyle: AlertStyle;
}
