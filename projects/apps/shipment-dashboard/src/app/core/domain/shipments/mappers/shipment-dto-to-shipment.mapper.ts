import { ShipmentDto } from '../models/shipments.dto.model';
import { Shipment } from '../models/shipments.model';

export const mapShipmentDtosToShipments = (dtos: ShipmentDto[]): Shipment[] => {
  return dtos.map(
    dto =>
      ({
        ...dto,
        productId: dto.product_id,
        trackingUrl: dto.tracking_url,
        carrierId: dto.carrier_id,
        cubicVolume: dto.cubic_volume,
        receiverContact: {
          ...dto.receiver_contact,
          created: new Date(dto.receiver_contact.created),
          modified: new Date(dto.receiver_contact.modified)
        },
        created: new Date(dto.created),
        modified: new Date(dto.modified)
      }) satisfies Shipment
  );
};
