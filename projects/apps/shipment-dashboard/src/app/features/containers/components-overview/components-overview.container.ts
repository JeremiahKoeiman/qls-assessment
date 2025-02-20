import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonComponent } from '@qls/components/button';
import { Option, SelectComponent } from '@qls/components/select';
import { SwitchComponent } from '@qls/components/switch';
import { TextareaComponent } from '@qls/components/textarea';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sd-components-overview',
  templateUrl: './components-overview.container.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    TranslocoPipe,
    SelectComponent,
    TextareaComponent,
    SwitchComponent
  ]
})
export class ComponentsOverviewContainer {
  public selectOptions: Option<string>[] = [
    {
      label: 'Option 1',
      value: 'option1'
    },
    {
      label: 'Option 2',
      value: 'option2'
    },
    {
      label: 'Option 3',
      value: 'option3'
    },
    {
      label: 'Option 4',
      value: 'option4'
    },
    {
      label: 'Option 5',
      value: 'option5'
    }
  ];

  private lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae congue metus. Curabitur eu aliquet justo. Sed convallis tincidunt lobortis.';

  public formGroup = new FormGroup({
    select: new FormControl<string | null>(''),
    textarea: new FormControl<string>('', [Validators.required]),
    switch: new FormControl<boolean>(false)
  });

  public fillFormGroup(): void {
    this.formGroup.patchValue({
      select: this.selectOptions[Math.floor(Math.random() * this.selectOptions.length)].value,
      textarea: this.lorem,
      switch: true
    });
  }

  public clearFormGroup(): void {
    this.formGroup.reset();
  }

  public markAllAsTouched(): void {
    this.formGroup.markAllAsTouched();
  }
}
