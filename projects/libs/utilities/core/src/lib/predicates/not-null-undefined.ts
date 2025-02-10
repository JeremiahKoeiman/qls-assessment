/**
 * Checks if a value is not `undefined`.
 *
 * This function is a type guard that narrows the type of the input value
 * to exclude `undefined`, ensuring that the value is of type `T`.
 * This is useful in the RxJS `filter` operator.
 *
 * @template T - The type of the value being checked.
 * @param value - The value to check.
 * @returns `true` if the value is not `undefined`, otherwise `false`.
 */
export function notUndefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

/**
 * Checks if the given value is not null.
 *
 * This function is a type guard that narrows the type of the input value
 * to exclude `null`, ensuring that the value is of type `T`.
 * This is useful in the RxJS `filter` operator.
 *
 * @param value - The value to check.
 * @returns True if the value is not null, otherwise false.
 */
export function notNull<T>(value: T | null): value is T {
  return value !== null;
}

/**
 * Checks if a value is neither `null` nor `undefined`.
 *
 * This function is a type guard that narrows the type of the input value
 * to exclude `null` and `undefined`, ensuring that the value is of type `T`.
 * This is useful in the RxJS `filter` operator.
 *
 * @typeParam T - The type of the value being checked.
 * @param value - The value to check.
 * @returns `true` if the value is neither `null` nor `undefined`, otherwise `false`.
 */
export function notNullUndefined<T>(value: T | null | undefined): value is T {
  return value !== undefined && value !== null;
}
