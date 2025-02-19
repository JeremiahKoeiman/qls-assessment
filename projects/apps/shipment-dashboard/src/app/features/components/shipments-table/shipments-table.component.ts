import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { ToolTipComponent } from '@qls/components/tooltip';
import { TriggerOverlayOnHoverDirective } from '@qls/utilities/angular';
import { DATETIME_FORMATS } from '@qls/utilities/i18n';

import { ReceiverContactPipe } from '#sd/app/core/pipes/receiver-contact-to-string.pipe';
import { Routes } from '#sd/app/core/utilities/constants';

import { ShipmentTemplateData } from '../../containers/overview/overview.container';

@Component({
  standalone: true,
  selector: 'sd-shipments-table',
  templateUrl: './shipments-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoPipe,
    MatTableModule,
    ToolTipComponent,
    TriggerOverlayOnHoverDirective,
    ReceiverContactPipe
  ]
})
export class ShipmentsTableComponent {
  /**
   * The dataSource for the table
   */
  @Input({ required: true }) public dataSource: ShipmentTemplateData[];

  public readonly routes = Routes;
  public readonly dateFormat = DATETIME_FORMATS.tableHeader;
  public readonly displayedColumns = ['trackingUrl', 'brandName', 'receiver', 'created'];
}
