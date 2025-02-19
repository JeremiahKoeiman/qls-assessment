import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, shareReplay } from 'rxjs';

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
   * The radios to render
   */
  @Input({ required: true }) public radios: Radio<T>[] = [];

  /**
   * The formcontrol for the radio group
   */
  @Input({ required: true }) public control: FormControl;

  @Memoize public get radios$(): Observable<Radio<T>[]> {
    return observeProperty(this as RadioGroupComponent<T>, 'radios').pipe(shareReplay(1));
  }
}
