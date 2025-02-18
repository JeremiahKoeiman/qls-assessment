import { FormControl, FormGroup } from '@angular/forms';

export interface ShipmentContactForm {
  name: FormControl<string>;
  companyname: FormControl<string>;
  housenumber: FormControl<string>;
  street: FormControl<string>;
  postalcode: FormControl<string>;
  locality: FormControl<string>;
  country: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
}

export interface ShipmentContact {
  name: string;
  companyname: string;
  housenumber: string;
  street: string;
  postalcode: string;
  locality: string;
  country: string;
  email: string;
  phone: string;
}

export interface CreateShipment {
  weight: number;
  codAmount: number;
  customsInvoiceNumber: string;
  customsShipmentType: string;
  senderContact: ShipmentContact;
  receiverContact: ShipmentContact;
}

export interface CreateShipmentForm {
  weight: FormControl<number>;
  codAmount: FormControl<number>;
  customsInvoiceNumber: FormControl<string>;
  customsShipmentType: FormControl<string>;
  senderContact: FormGroup<ShipmentContactForm>;
  receiverContact: FormGroup<ShipmentContactForm>;
}
