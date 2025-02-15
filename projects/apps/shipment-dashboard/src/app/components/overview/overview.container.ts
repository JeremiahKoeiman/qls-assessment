import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CheckboxComponent } from '@qls/components/checkbox';
import { InputComponent } from '@qls/components/input';
import { Radio, RadioGroupComponent } from '@qls/components/radio-group';
import { Option, SelectComponent } from '@qls/components/select';
import { SwitchComponent } from '@qls/components/switch';
import { TextareaComponent } from '@qls/components/textarea';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sh-overview',
  templateUrl: './overview.container.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    TextareaComponent,
    SelectComponent,
    MatOptionModule,
    MatSelectModule,
    CheckboxComponent,
    RadioGroupComponent,
    SwitchComponent
  ]
})
export class OverviewComponent implements OnInit {
  // private httpClient = inject(HttpClient);

  public formGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    animal: new FormControl<Animal | null>(null, Validators.required),
    checkbox: new FormControl<boolean>(false),
    radio: new FormControl<boolean>(false),
    switch: new FormControl<boolean>(true)
  });

  ngOnInit(): void {
    this.formGroup.controls.animal.setValue(this.animals[1]);

    this.formGroup.controls.animal.valueChanges.subscribe(res => console.log('animal', res));

    // this.httpClient.get(`${environment.apiBaseUrl}/${environment.companyId}/shipments`).subscribe(res => console.log('shipments', res));
  }

  public animals: Animal[] = [
    { name: 'Dog', sound: 'Woof!' },
    { name: 'Cat', sound: 'Meow!' },
    { name: 'Cow', sound: 'Moo!' },
    { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' }
  ];

  public radios: Radio<number>[] = [
    { label: 'Radio 1', value: 1 },
    { label: 'Radio 2', value: 2 },
    { label: 'Radio 3', value: 3 }
  ];

  public mappedAnimals = this.mapAnimalsToOption(this.animals);

  private mapAnimalsToOption(animals: Animal[]): Option<Animal>[] {
    return animals.map(animal => ({
      label: animal.name,
      value: animal
    }));
  }
}

interface Animal {
  name: string;
  sound: string;
}
