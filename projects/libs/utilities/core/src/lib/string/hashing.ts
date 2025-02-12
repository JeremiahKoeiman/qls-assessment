import { Buffer } from 'buffer';

export const stringToBase64 = (value: string) => Buffer.from(value).toString('base64');

export const base64ToString = (encodedValue: string) => Buffer.from(encodedValue).toString('utf-8');
