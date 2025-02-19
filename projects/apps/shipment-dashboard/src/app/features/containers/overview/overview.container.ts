import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonComponent } from '@qls/components/button';
import { CustomPaginatorIntl, PaginationComponent } from '@qls/components/pagination';
import { SpinnerComponent } from '@qls/components/spinner';
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
    ShipmentsTableComponent,
    TranslocoPipe,
    PaginationComponent,
    SpinnerComponent,
    ShipmentsCardsComponent,
    ButtonComponent
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }]
})
export class OverviewComponent {
  private readonly router = inject(Router);
  private readonly shipmentsService = inject(ShipmentsService);

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly pageIndexSubject = new BehaviorSubject<number>(0);

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
