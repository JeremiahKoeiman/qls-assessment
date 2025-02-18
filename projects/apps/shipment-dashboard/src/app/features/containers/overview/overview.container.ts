import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonComponent } from '@qls/components/button';
import { CheckboxComponent } from '@qls/components/checkbox';
import { InputComponent } from '@qls/components/input';
import { CustomPaginatorIntl, PaginationComponent } from '@qls/components/pagination';
import { RadioGroupComponent } from '@qls/components/radio-group';
import { SelectComponent } from '@qls/components/select';
import { SnackbarComponent } from '@qls/components/snackbar';
import { SpinnerComponent } from '@qls/components/spinner';
import { SwitchComponent } from '@qls/components/switch';
import { TextareaComponent } from '@qls/components/textarea';
import { Memoize } from '@qls/utilities/reactive';

import { BehaviorSubject, Observable, distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs';

import { ApiPagination } from '#sd/app/core/domain/api/api-result.model';
import { Shipment } from '#sd/app/core/domain/shipments/models/shipments.model';
import { ShipmentsService } from '#sd/app/core/domain/shipments/shipments.service';
import { Routes } from '#sd/app/core/utilities/constants';

import { ShipmentCard, ShipmentsCardsComponent } from '../../components/shipments-cards/shipments-cards.component';
import { ShipmentTableRow, ShipmentsTableComponent } from '../../components/shipments-table/shipments-table.component';

// interface Animal {
//   name: string;
//   sound: string;
// }

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sd-overview',
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
    SwitchComponent,
    SnackbarComponent,
    ShipmentsTableComponent,
    TranslocoPipe,
    PaginationComponent,
    SpinnerComponent,
    ShipmentsCardsComponent,
    MatAutocompleteModule,
    ButtonComponent
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }]
})
export class OverviewComponent {
  // public readonly countries = this.mapLookupCountriesToOptionCountries(lookupCountries);

  private readonly router = inject(Router);

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly pageIndexSubject = new BehaviorSubject<number>(0);

  private readonly shipmentsService = inject(ShipmentsService);

  // public formGroup = new FormGroup({
  //   email: new FormControl('', [Validators.required]),
  //   area: new FormControl('', [Validators.required]),
  //   animal: new FormControl<Animal | null>(null, Validators.required),
  //   checkbox: new FormControl<boolean>(false),
  //   radio: new FormControl<boolean>(false),
  //   switch: new FormControl<boolean>(true),
  //   countries: new FormControl<string>('')
  // });

  // public animals: Animal[] = [
  //   { name: 'Dog', sound: 'Woof!' },
  //   { name: 'Cat', sound: 'Meow!' },
  //   { name: 'Cow', sound: 'Moo!' },
  //   { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' }
  // ];

  // public radios: Radio<number>[] = [
  //   { label: 'Radio 1', value: 1 },
  //   { label: 'Radio 2', value: 2 },
  //   { label: 'Radio 3', value: 3 }
  // ];

  // public mappedAnimals = this.mapAnimalsToOption(this.animals);

  // private mapAnimalsToOption(animals: Animal[]): Option<Animal>[] {
  //   return animals.map(animal => ({
  //     label: animal.name,
  //     value: animal
  //   }));
  // }

  // private mapLookupCountriesToOptionCountries(countries: Country[]): Option<string>[] {
  //   return countries.map(country => ({
  //     label: country.country,
  //     value: country.iso2
  //   }));
  // }

  // public displayFn(option: Option<string>): string {
  //   return option.label;
  // }

  public navigateToCreateShipment(): void {
    this.router.navigate([Routes.SHIPMENTS, Routes.CREATE]);
  }

  public handlePageChange(pageEvent: PageEvent): void {
    this.pageIndexSubject.next(pageEvent.pageIndex + 1);
  }

  @Memoize public get tableDataSource$(): Observable<ShipmentTableRow[]> {
    return this.shipments$.pipe(
      tap(() => this.loadingSubject.next(true)),
      map(shipments =>
        shipments.map(
          shipment =>
            ({
              id: shipment.id,
              barcode: shipment.barcode,
              trackingUrl: shipment.trackingUrl,
              brand: shipment.brand,
              receiverContact: shipment.receiverContact,
              created: shipment.created
            }) satisfies ShipmentTableRow
        )
      ),
      tap(() => this.loadingSubject.next(false))
    );
  }

  @Memoize public get cardsDataSource$(): Observable<ShipmentCard[]> {
    return this.shipments$.pipe(
      tap(() => this.loadingSubject.next(true)),
      map(shipments =>
        shipments.map(
          shipment =>
            ({
              id: shipment.id,
              barcode: shipment.barcode,
              trackingUrl: shipment.trackingUrl,
              brand: shipment.brand,
              receiverContact: shipment.receiverContact
            }) satisfies ShipmentCard
        )
      ),
      tap(() => this.loadingSubject.next(false))
    );
  }

  @Memoize public get isLoading$(): Observable<boolean> {
    return this.loadingSubject.asObservable().pipe(distinctUntilChanged(), shareReplay(1));
  }

  @Memoize public get pagination$(): Observable<ApiPagination> {
    return this.shipmentsService.pagination$.pipe(shareReplay(1));
  }

  @Memoize private get shipments$(): Observable<Shipment[]> {
    return this.pageIndexSubject.pipe(switchMap(pageIndex => this.shipmentsService.getAll(pageIndex)));
  }
}
