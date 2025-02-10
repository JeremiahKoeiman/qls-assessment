interface TranslatableText {
  key: string;
  params?: Record<string, unknown>;
}
export type UiText = string | TranslatableText;

export const isLabel = (label: UiText): label is string => typeof label === 'string';
export const isTranslatable = (label: UiText): label is TranslatableText => (label as TranslatableText).key !== undefined;
