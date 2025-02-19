import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'qls-switch',
  templateUrl: './switch.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatSlideToggleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ]
})
export class SwitchComponent<T> {
  /**
   * The label to display
   */
  @Input({ required: true }) public label: string;

  /**
   * The formcontrol for the switch component
   */
  @Input({ required: true }) public control: FormControl;

  @Memoize public get label$(): Observable<string> {
    return observeProperty(this as SwitchComponent<T>, 'label').pipe(shareReplay(1));
  }
}
