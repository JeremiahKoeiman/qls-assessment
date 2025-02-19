import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonComponent } from '@qls/components/button';
import { CardComponent, CardContentComponent, CardFooterComponent, CardHeaderComponent } from '@qls/components/card';

import { ReceiverContactPipe } from '#sd/app/core/pipes/receiver-contact-to-string.pipe';
import { Routes } from '#sd/app/core/utilities/constants';

import { ShipmentTemplateData } from '../../containers/overview/overview.container';

@Component({
  standalone: true,
  selector: 'sd-shipments-cards',
  templateUrl: './shipments-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoPipe,
    CardComponent,
    CardContentComponent,
    CardFooterComponent,
    CardHeaderComponent,
    ButtonComponent,
    ReceiverContactPipe
  ]
})
export class ShipmentsCardsComponent {
  /**
   * The shipments for the cards
   */
  @Input({ required: true }) public dataSource: ShipmentTemplateData[];

  private readonly router = inject(Router);

  public navigateToShipmentDetail(shipmentId: string): void {
    this.router.navigate([Routes.SHIPMENTS, shipmentId]);
  }
}
