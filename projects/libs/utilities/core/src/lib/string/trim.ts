export const trimEnd = (str: string, ch: string): string => {
  let end = str.length;

  while (end > 0 && str[end - 1] === ch) --end;

  return end < str.length ? str.substring(0, end) : str;
};

export const trimStart = (str: string, ch: string): string => {
  let start = 0;

  while (start < str.length && str[start] === ch) ++start;

  return start > 0 || str.length < str.length ? str.substring(start, str.length) : str;
};

export const trimString = (str: string, ch: string): string => {
  return trimStart(trimEnd(str, ch), ch);
};
