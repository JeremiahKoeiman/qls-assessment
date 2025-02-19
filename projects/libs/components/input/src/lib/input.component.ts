import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseFormValidationHandler } from '@qls/utilities/angular';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'qls-input',
  templateUrl: './input.component.html',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input({ required: true }) public control: FormControl;

  /**
   * The HTML input type
   */
  @Input() public inputType: 'text' | 'number' = 'text';

  /**
   * The placeholder of the input
   */
  @Input() public placeholder?: string;

  /**
   * The auto complete component that will be connected to the input
   */
  @Input() public autocomplete?: MatAutocomplete;

  @Memoize public get label$(): Observable<string> {
    return observeProperty(this as InputComponent, 'label').pipe(shareReplay(1));
  }

  @Memoize protected get control$(): Observable<FormControl> {
    return observeProperty(this as InputComponent, 'control').pipe(shareReplay(1));
  }
}
