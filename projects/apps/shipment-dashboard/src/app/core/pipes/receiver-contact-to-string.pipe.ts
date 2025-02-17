import { Pipe, PipeTransform } from '@angular/core';

import { ReceiverContact } from '#sd/app/core/domain/shipments/shipments.model';

@Pipe({
  name: 'receiverAddress',
  standalone: true
})
export class ReceiverContactPipe implements PipeTransform {
  public transform(receiverContact: ReceiverContact): string {
    return `${receiverContact.street} ${receiverContact.housenumber}, ${receiverContact.postalcode} ${receiverContact.locality} (${receiverContact.country})`;
  }
}
