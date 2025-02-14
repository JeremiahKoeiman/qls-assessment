import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  @Input() public label: string;

  /**
   * The formcontrol
   */
  @Input() public control: FormControl;
}
