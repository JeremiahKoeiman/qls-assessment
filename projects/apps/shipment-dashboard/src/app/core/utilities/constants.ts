export enum Routes {
  SHIPMENTS = 'shipments',
  CREATE = 'create',
  SETTINGS = 'settings'
}

export const languages = ['en', 'nl'] as const;
export type Languages = (typeof languages)[number];

export const languageSettingLocalStorageKey = 'qls.settings.language';
