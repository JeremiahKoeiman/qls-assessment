export function isFalsy<T>(value: T | null | undefined): value is T {
  return !value;
}

export function isTruthy<T>(value: T | null | undefined): value is T {
  return !!value;
}

export const hasMultipleTrue = (atLeast: number, ...booleans: boolean[]): boolean => {
  return booleans.filter(Boolean).length >= atLeast;
};
