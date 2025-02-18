import { Entity, EntityWithName } from '@qls/utilities/core';

const status = ['created', 'printed', 'pre_transit', 'in_transit', 'delivered', 'returned_to_sender'] as const;
export type Status = (typeof status)[number];

export interface Shipment extends Entity {
  productId: number;
  reference?: string;
  barcode: string;
  trackingUrl: string;
  status: Status;
  carrierId: string;
  cubicVolume: number;
  receiverContact: ReceiverContact;
  product: Product;
  brand: Brand;
}

export interface ReceiverContact extends Entity {
  name: string;
  companyname: string;
  street: string;
  housenumber: string;
  address2?: string;
  postalcode: string;
  locality: string;
  country: string;
}

export interface Product {
  name: string;
  type: string;
}

export interface Brand extends EntityWithName {}
