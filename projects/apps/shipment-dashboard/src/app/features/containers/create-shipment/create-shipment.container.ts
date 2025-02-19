import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonComponent } from '@qls/components/button';
import { InputComponent } from '@qls/components/input';
import { Option, SelectComponent } from '@qls/components/select';
import { extractFormValue } from '@qls/utilities/angular';
import { capitalize } from '@qls/utilities/core';
import { Memoize } from '@qls/utilities/reactive';

import { Country, countries as lookupCountries } from 'country-code-lookup';
import { Observable, Subject, Subscription, map, shareReplay, switchMap } from 'rxjs';

import { ShipmentType, shipmentTypes } from '#sd/app/core/domain/shipments/models/shiments-v2.model';
import { CreateShipment, CreateShipmentForm } from '#sd/app/core/domain/shipments/models/shipment.form.model';
import { ShipmentsService } from '#sd/app/core/domain/shipments/shipments.service';

import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

const yeet: CreateShipment = {
  weight: 500,
  codAmount: 20,
  customsInvoiceNumber: '',
  customsShipmentType: 'commercial',
  senderContact: {
    name: 'hbsf',
    companyname: 'Stadhuis',
    housenumber: '40',
    street: 'Coolsingel',
    postalcode: '3011AD',
    locality: 'Rotterdam',
    country: 'NL',
    email: 'test@email.com',
    phone: '0612345678'
  },
  receiverContact: {
    name: 'Jerry',
    companyname: 'Bijenkorf',
    housenumber: '105',
    street: 'Coolsingel',
    postalcode: '3012AG',
    locality: 'Rotterdam',
    country: 'NL',
    email: 'bijenkorf@email.com',
    phone: '0687654321'
  }
};

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sd-create-shipment',
  templateUrl: './create-shipment.container.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoPipe,
    InputComponent,
    MatAutocompleteModule,
    ContactFormComponent,
    SelectComponent,
    ButtonComponent
  ]
})
export class CreateShipmentsContainer implements OnInit, OnDestroy {
  public shipmentTypes: Option<ShipmentType>[];
  public readonly countries = lookupCountries;

  public formGroup = new FormGroup<CreateShipmentForm>({
    weight: new FormControl<number>(0, [Validators.required]),
    codAmount: new FormControl<number>(0, [Validators.required]),
    customsInvoiceNumber: new FormControl<string>(''),
    customsShipmentType: new FormControl<string>('', [Validators.required]),
    senderContact: new FormGroup({
      name: new FormControl<string>('', [Validators.required]),
      companyname: new FormControl<string>('', [Validators.required]),
      housenumber: new FormControl<string>('', [Validators.required]),
      street: new FormControl<string>('', [Validators.required]),
      postalcode: new FormControl<string>('', [Validators.required]),
      locality: new FormControl<string>('', [Validators.required]), //City
      country: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      phone: new FormControl<string>('')
    }),
    receiverContact: new FormGroup({
      name: new FormControl<string>('', [Validators.required]),
      companyname: new FormControl<string>('', [Validators.required]),
      housenumber: new FormControl<string>('', [Validators.required]),
      street: new FormControl<string>('', [Validators.required]),
      postalcode: new FormControl<string>('', [Validators.required]),
      locality: new FormControl<string>('', [Validators.required]), //City
      country: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      phone: new FormControl<string>('')
    })
  });

  private readonly shipmentService = inject(ShipmentsService);

  private readonly saveShipmentSubject = new Subject<CreateShipment>();
  private readonly subscription = new Subscription();

  public ngOnInit(): void {
    this.formGroup.setValue(yeet);

    this.shipmentTypes = this.mapShipmenTypesToOptions();

    this.actOnSaveShipment();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public saveShipment(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      const shipment = extractFormValue<CreateShipment>(this.formGroup);
      this.saveShipmentSubject.next(shipment);
    }
  }

  @Memoize public get filteredSenderCountryOptions$(): Observable<Country[]> {
    return this.formGroup.controls.senderContact.controls.country.valueChanges.pipe(
      map(value => this.filterCountriesBasedOnCountryName(value)),
      shareReplay(1)
    );
  }

  @Memoize public get filteredReceiverCountryOptions$(): Observable<Country[]> {
    return this.formGroup.controls.receiverContact.controls.country.valueChanges.pipe(
      map(value => this.filterCountriesBasedOnCountryName(value)),
      shareReplay(1)
    );
  }

  private actOnSaveShipment(): void {
    this.subscription.add(
      this.saveShipmentSubject.pipe(switchMap(shipment => this.shipmentService.create(shipment))).subscribe()
    );
  }

  private filterCountriesBasedOnCountryName(countryName: string): Country[] {
    const filterValue = countryName.toLowerCase() ?? '';
    return this.countries.filter(country => country.country.toLowerCase().includes(filterValue));
  }

  private mapShipmenTypesToOptions(): Option<ShipmentType>[] {
    return shipmentTypes.map(
      type =>
        ({
          label: capitalize(type),
          value: type
        }) satisfies Option<ShipmentType>
    );
  }
}
