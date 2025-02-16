import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoPipe } from '@jsverse/transloco';
import { CheckboxComponent } from '@qls/components/checkbox';
import { InputComponent } from '@qls/components/input';
import { CustomPaginatorIntl, PaginationComponent } from '@qls/components/pagination';
import { RadioGroupComponent } from '@qls/components/radio-group';
import { SelectComponent } from '@qls/components/select';
import { SnackbarComponent } from '@qls/components/snackbar';
import { SpinnerComponent } from '@qls/components/spinner';
import { SwitchComponent } from '@qls/components/switch';
import { TextareaComponent } from '@qls/components/textarea';
import { DATETIME_FORMATS } from '@qls/utilities/i18n';
import { Memoize } from '@qls/utilities/reactive';

import { BehaviorSubject, Observable, distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs';

import { ApiPagination } from '#sd/app/core/domain/api/api-result.model';
import { ShipmentsService } from '#sd/app/core/domain/shipments/shipments.service';

import { ShipmentTableRow, ShipmentsTableComponent } from '../../components/shipments-table/shipments-table.component';

// interface Animal {
//   name: string;
//   sound: string;
// }

/* export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
]; */

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
    SwitchComponent,
    SnackbarComponent,
    ShipmentsTableComponent,
    TranslocoPipe,
    PaginationComponent,
    SpinnerComponent
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }]
})
export class OverviewComponent {
  public readonly dateFormat = DATETIME_FORMATS.tableHeader;
  public readonly displayedColumns = ['trackingUrl', 'brandName', 'receiver', 'created'];

  private readonly shipmentsService = inject(ShipmentsService);

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly pageIndexSubject = new BehaviorSubject<number>(0);

  // Table
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  /* public formGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    animal: new FormControl<Animal | null>(null, Validators.required),
    checkbox: new FormControl<boolean>(false),
    radio: new FormControl<boolean>(false),
    switch: new FormControl<boolean>(true)
  });

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
  } */

  public handlePageChange(pageEvent: PageEvent): void {
    this.pageIndexSubject.next(pageEvent.pageIndex + 1);
  }

  @Memoize public get pagination$(): Observable<ApiPagination> {
    return this.shipmentsService.pagination$.pipe(shareReplay(1));
  }

  @Memoize public get dataSource$(): Observable<ShipmentTableRow[]> {
    return this.pageIndexSubject.pipe(
      tap(() => this.loadingSubject.next(true)),
      switchMap(pageIndex => this.shipmentsService.getAll(pageIndex)),
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

  @Memoize public get isLoading$(): Observable<boolean> {
    return this.loadingSubject.asObservable().pipe(distinctUntilChanged(), shareReplay(1));
  }
}
