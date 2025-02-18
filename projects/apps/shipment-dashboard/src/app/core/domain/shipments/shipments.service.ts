import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Memoize } from '@qls/utilities/reactive';

import { Observable, Subject, map, tap } from 'rxjs';

import { environment } from '#sd/environment';

import { ApiPagination, ApiResult } from '../api/api-result.model';

import { mapShipmentDtosToShipments } from './mappers/shipment-dto-to-shipment.mapper';
import { mapShipmentsFormToShipmentsV2Dto } from './mappers/shipments-v2.mapper';
import { CreateShipment } from './models/shipment.form.model';
import { ShipmentDto } from './models/shipments.dto.model';
import { Shipment } from './models/shipments.model';

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

  public create(shipment: CreateShipment): Observable<any> {
    return this.httpClient.post(
      `${environment.apiBaseUrl}/${environment.companyId}/shipments`,
      mapShipmentsFormToShipmentsV2Dto(shipment)
    );
  }

  @Memoize public get pagination$(): Observable<ApiPagination> {
    return this.paginationSubject.asObservable();
  }
}
