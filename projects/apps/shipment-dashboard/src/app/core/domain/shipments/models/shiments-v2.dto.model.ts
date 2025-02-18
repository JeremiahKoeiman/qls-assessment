export interface ShipmentV2Dto {
  product_combination_id: number;
  brand_id: string;
  reference: string;
  weight: number;
  cod_amount: number;
  customs_invoice_number: string;
  customs_shipment_type: string;
  sender_contact?: ShipmentV2ContactDto;
  receiver_contact: ShipmentV2ContactDto;
}

export interface ShipmentV2ContactDto {
  name: string;
  street: string;
  housenumber: string;
  postalcode: string;
  country: string;
  email: string;
  phone: string;
  locality: string;
}
