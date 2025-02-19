import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BaseFormValidationHandler } from '@qls/utilities/angular';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, shareReplay } from 'rxjs';

import { Option } from './select.model';

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
  @Input({ required: true }) public label: string;

  /**
   * The formcontrol for the select component
   */
  @Input({ required: true }) public control: FormControl;

  /**
   * The placeholder of the input
   */
  @Input() public placeholder?: string;

  /**
   * The options of the select
   */
  @Input({ required: true }) public options: Option<T>[] = [];

  @Memoize public get label$(): Observable<string> {
    return observeProperty(this as SelectComponent<T>, 'label').pipe(shareReplay(1));
  }

  @Memoize protected get control$(): Observable<FormControl> {
    return observeProperty(this as SelectComponent<T>, 'control').pipe(shareReplay(1));
  }
}
