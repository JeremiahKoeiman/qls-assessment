import { EntityWithName } from '@qls/utilities/core';

const status = ['created', 'printed', 'pre_transit', 'in_transit', 'delivered', 'returned_to_sender'] as const;
export type Status = (typeof status)[number];

export interface ShipmentDto {
  id: string;
  product_id: number;
  reference?: string;
  barcode: string;
  tracking_url: string;
  status: Status;
  carrier_id: string;
  cubic_volume: number;
  receiver_contact: ReceiverContactDto;
  product: ProductDto;
  brand: BrandDto;
  created: string;
  modified: string;
}

export interface ReceiverContactDto {
  id: string;
  name: string;
  companyname: string;
  street: string;
  housenumber: string;
  address2?: string;
  postalcode: string;
  locality: string;
  country: string;
  created: string;
  modified: string;
}

export interface ProductDto {
  name: string;
  type: string;
}

export interface BrandDto extends EntityWithName {}
