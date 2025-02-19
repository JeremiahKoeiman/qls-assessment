import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'qls-checkbox',
  templateUrl: './checkbox.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent {
  /**
   * The label to display
   */
  @Input({ required: true }) public label: string;

  /**
   * The formcontrol
   */
  @Input({ required: true }) public control: FormControl;

  @Memoize public get label$(): Observable<string> {
    return observeProperty(this as CheckboxComponent, 'label').pipe(shareReplay(1));
  }
}
