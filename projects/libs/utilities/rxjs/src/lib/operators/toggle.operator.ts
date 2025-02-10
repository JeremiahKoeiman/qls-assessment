import { OperatorFunction, distinctUntilChanged, scan, startWith } from 'rxjs';

/**
 * Turns the source stream into a boolean toggle. Every emit will flip the toggle.
 *
 * @remarks
 * The operator will directly emit the starting value
 *
 * @param {boolean}  startingValue - The intial value.
 * @returns The stream with the toggle value
 */
export function toggle<T>(startingValue: boolean): OperatorFunction<T, boolean> {
  return source$ =>
    source$.pipe(
      scan((state) => !state, startingValue),
      startWith(startingValue),
      distinctUntilChanged()
    );
}
