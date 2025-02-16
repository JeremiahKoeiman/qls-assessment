import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Memoize } from '@qls/utilities/reactive';

import { Observable, Subject, map, tap } from 'rxjs';

import { environment } from '#sd/environment';

import { ApiPagination, ApiResult } from '../api/api-result.model';

import { mapShipmentDtosToShipments } from './mappers/shipment-dto-to-shipment.mapper';
import { ShipmentDto } from './shipments.dto.model';
import { Shipment } from './shipments.model';

@Injectable({ providedIn: 'root' })
export class ShipmentsService {
  private readonly httpClient = inject(HttpClient);

  private readonly paginationSubject = new Subject<ApiPagination>();

  public getAll(page: number = 1): Observable<Shipment[]> {
    return this.httpClient
      .get<ApiResult<ShipmentDto>>(`${environment.apiBaseUrl}/${environment.companyId}/shipments`, {
        params: new HttpParams().set('page', page)
      })
      .pipe(
        tap(result => this.paginationSubject.next(result.pagination)),
        map(result => mapShipmentDtosToShipments(result.data))
      );
  }

  @Memoize public get pagination$(): Observable<ApiPagination> {
    return this.paginationSubject.asObservable();
  }
}
