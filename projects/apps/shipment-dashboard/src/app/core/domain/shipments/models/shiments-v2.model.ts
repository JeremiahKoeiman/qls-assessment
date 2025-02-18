export interface ShipmentV2 {
  productCombinationId: number;
  brandId: string;
  reference: string;
  weight: number;
  codAmount: number;
  customsInvoiceNumber: string;
  customsShipmentType: ShipmentType;
  senderContact?: ShipmentV2Contact;
  receiverContact: ShipmentV2Contact;
}

export interface ShipmentV2Contact {
  name: string;
  street: string;
  housenumber: string;
  postalcode: string;
  country: string;
  email: string;
  phone: string;
  locality: string;
}

export const shipmentTypes = ['commercial', 'international'];
export type ShipmentType = (typeof shipmentTypes)[number];
