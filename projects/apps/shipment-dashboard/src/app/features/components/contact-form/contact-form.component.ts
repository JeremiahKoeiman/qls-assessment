import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslocoPipe } from '@jsverse/transloco';
import { InputComponent } from '@qls/components/input';
import { Memoize } from '@qls/utilities/reactive';

import { Country, countries } from 'country-code-lookup';
import { Observable, map, shareReplay, startWith } from 'rxjs';

import { ShipmentContactForm } from '#sd/app/core/domain/shipments/models/shipment.form.model';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sd-contact-form',
  templateUrl: './contact-form.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslocoPipe, InputComponent, MatAutocompleteModule]
})
export class ContactFormComponent {
  /**
   * The shipment contact form group
   */
  @Input({ required: true }) public group: FormGroup<ShipmentContactForm>;

  /**
   * The heading of the form
   */
  @Input() public heading?: string;

  @Memoize public get filteredCountryOptions$(): Observable<Country[]> {
    return this.group.controls.country.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCountriesBasedOnCountryName(value)),
      shareReplay(1)
    );
  }

  private filterCountriesBasedOnCountryName(countryName: string): Country[] {
    const filterValue = countryName.toLowerCase() ?? '';
    return countries.filter(country => country.country.toLowerCase().includes(filterValue));
  }
}
