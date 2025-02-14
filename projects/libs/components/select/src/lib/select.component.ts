import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BaseFormValidationHandler } from '@qls/utilities/angular';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, shareReplay } from 'rxjs';

export interface Option<T> {
  label: string;
  value: T;
}

@Component({
  selector: 'qls-select',
  templateUrl: './select.component.html',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent<T> extends BaseFormValidationHandler {
  /**
   * The label to display
   */
  @Input() public label: string;

  /**
   * The formcontrol
   */
  @Input() public control: FormControl;

  /**
   * The placeholder of the input
   */
  @Input() public placeholder?: string;

  /**
   * The options of the select
   */
  @Input({ required: true }) public options: Option<T>[] = [];

  @Memoize protected get control$(): Observable<FormControl> {
    return observeProperty(this as SelectComponent<T>, 'control').pipe(shareReplay(1));
  }
}
