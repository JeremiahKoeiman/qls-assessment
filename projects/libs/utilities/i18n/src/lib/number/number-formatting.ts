const dutchLocale = 'nl-NL';

export const formatNumber = (numb: number, locale: string = dutchLocale): string => {
  return numb.toLocaleString(locale, {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
