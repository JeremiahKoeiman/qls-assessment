import { Entity } from '@qls/utilities/core';

export interface Country extends Entity {
  name: string;
  code?: string;
}

export interface CountryWithCallingCodes extends Country {
  nationality: string;
  callingCode: string;
}
