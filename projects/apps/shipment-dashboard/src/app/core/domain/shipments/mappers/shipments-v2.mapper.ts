import { byCountry } from 'country-code-lookup';

import { environment } from '#sd/environment';

import { ShipmentV2Dto } from '../models/shiments-v2.dto.model';
import { CreateShipment } from '../models/shipment.form.model';

export const mapShipmentsFormToShipmentsV2Dto = (shipment: CreateShipment): ShipmentV2Dto => {
  return {
    brand_id: environment.brandId,
    reference: environment.shipmentReference,
    product_combination_id: 1,
    weight: shipment.weight,
    cod_amount: shipment.codAmount,
    customs_invoice_number: shipment.customsInvoiceNumber,
    customs_shipment_type: shipment.customsShipmentType,
    sender_contact: {
      ...shipment.senderContact,
      country: byCountry(shipment.senderContact.country)?.iso2 || 'NL'
    },
    receiver_contact: {
      ...shipment.receiverContact,
      country: byCountry(shipment.receiverContact.country)?.iso2 || 'NL'
    }
  } satisfies ShipmentV2Dto;
};
