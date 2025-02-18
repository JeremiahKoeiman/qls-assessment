import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseFormValidationHandler } from '@qls/utilities/angular';
import { UiText, UiTextPipe } from '@qls/utilities/i18n';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'qls-input',
  templateUrl: './input.component.html',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, UiTextPipe],
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
  @Input({ required: true }) public label: UiText;

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
  @Input() public placeholder?: UiText;

  /**
   * The auto complete component that needs to be connected to the input
   */
  @Input() public autocomplete?: MatAutocomplete;

  @Memoize protected get control$(): Observable<FormControl> {
    return observeProperty(this as InputComponent, 'control').pipe(shareReplay(1));
  }
}
