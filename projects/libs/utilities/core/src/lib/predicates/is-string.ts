export function isString<T>(value: T): value is T {
  return typeof value === 'string';
}
