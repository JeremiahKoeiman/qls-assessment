import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CheckboxComponent } from '@qls/components/checkbox';
import { InputComponent } from '@qls/components/input';
import { Option, SelectComponent } from '@qls/components/select';
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
    CheckboxComponent
  ]
})
export class OverviewComponent implements OnInit {
  // private httpClient = inject(HttpClient);

  public formGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    animal: new FormControl<Animal | null>(null, Validators.required),
    checkbox: new FormControl<boolean>(false)
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
