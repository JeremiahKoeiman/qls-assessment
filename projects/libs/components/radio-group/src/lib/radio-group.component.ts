import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

export interface Radio<T> {
  label: string;
  value: T;
}

@Component({
  selector: 'qls-radio-group',
  templateUrl: './radio-group.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ]
})
export class RadioGroupComponent<T> {
  /**
   * The label to display
   */
  @Input() public radios: Radio<T>[] = [];

  /**
   * The formcontrol
   */
  @Input() public control: FormControl;
}
