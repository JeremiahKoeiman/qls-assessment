import { Injectable, inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@jsverse/transloco';

import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginatorIntl implements MatPaginatorIntl {
  public changes = new Subject<void>();

  private readonly translocoService = inject(TranslocoService);

  public firstPageLabel = this.translocoService.translate('PAGINATION.FIRST-PAGE');
  public itemsPerPageLabel = this.translocoService.translate('PAGINATION.ITEMS-PER-PAGE');
  public lastPageLabel = this.translocoService.translate('PAGINATION.LAST-PAGE');

  public nextPageLabel = this.translocoService.translate('PAGINATION.NEXT-PAGE');
  public previousPageLabel = this.translocoService.translate('PAGINATION.PREVIOUS-PAGE');

  public getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.translocoService.translate('PAGINATION.PAGE-OF-PAGES', { pageNumber: 1, totalPages: 1 });
    }

    const totalPages = Math.ceil(length / pageSize);

    return this.translocoService.translate('PAGINATION.PAGE-OF-PAGES', { pageNumber: page + 1, totalPages });
  }
}
