import { Observable, forkJoin, map, timer } from 'rxjs';

/**
 * Wait atleast x miliseconds before emiting.
 *
 * @remarks
 * This function uses forkJoin and will need to source stream to complete before emitting.
 *
 * @param {Observable<T>}  source$ - the source stream
 * @param {number}  miliseconds - The minimal time that needs to pass before emitting
 * @returns The stream with the toggle value
 */
export function waitAtleast<T>(source$: Observable<T>, miliseconds: number): Observable<T> {
  return forkJoin([source$, timer(miliseconds)]).pipe(map(([result]) => result));
}
