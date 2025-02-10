export interface Address {
  postalCode: string;
  houseNumber: string;
  affix?: string;
  city: string;
  street: string;
  country: string;
}

export const addressFields = ['postalCode', 'houseNumber', 'street', 'city', 'country', 'affix'] as const;

export type AddressField = (typeof addressFields)[number];
