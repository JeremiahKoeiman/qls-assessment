/**
 * Debounce a function call
 * @deprecated Please use a more reactive approach with RxJs and the debounceTime operator
 * @param func function to debounce
 * @param delay time to delay
 * @returns void
 */
export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): void => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
};
