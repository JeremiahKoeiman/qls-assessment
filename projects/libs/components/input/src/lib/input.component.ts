import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoPipe } from '@jsverse/transloco';
import { BaseFormValidationHandler } from '@qls/utilities/angular';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'qls-input',
  templateUrl: './input.component.html',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, TranslocoPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent extends BaseFormValidationHandler {
  /**
   * The label to display
   */
  @Input({ required: true }) public label: string;

  /**
   * The formcontrol
   */
  @Input() public control: FormControl;

  /**
   * The placeholder of the input
   */
  @Input() public placeholder?: string;

  @Memoize protected get control$(): Observable<FormControl> {
    return observeProperty(this as InputComponent, 'control').pipe(shareReplay(1));
  }
}
