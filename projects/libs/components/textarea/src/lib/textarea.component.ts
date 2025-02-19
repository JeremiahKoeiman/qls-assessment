import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseFormValidationHandler } from '@qls/utilities/angular';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'qls-textarea',
  templateUrl: './textarea.component.html',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent extends BaseFormValidationHandler {
  /**
   * The label to display
   */
  @Input({ required: true }) public label: string;

  /**
   * The formcontrol for the textarea
   */
  @Input({ required: true }) public control: FormControl;

  /**
   * The rows of the textarea
   */
  @Input() public rows = 1;

  /**
   * The placeholder of the input
   */
  @Input() public placeholder?: string;

  @Memoize public get label$(): Observable<string> {
    return observeProperty(this as TextareaComponent, 'label').pipe(shareReplay(1));
  }

  @Memoize protected get control$(): Observable<FormControl> {
    return observeProperty(this as TextareaComponent, 'control').pipe(shareReplay(1));
  }
}
