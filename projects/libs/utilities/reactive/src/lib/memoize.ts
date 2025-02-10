// source: https://gist.github.com/dscheerens/8791470290d2a051934fb45890b23601
const GLOBAL_MEMOIZATION_MAP = new WeakMap<object, Map<string, unknown>>();

/**
 * A decorator function that memoizes the result of a getter method.
 * The memoized value is stored in a WeakMap to ensure garbage collection.
 * More info about WeakMap: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
 *
 * @template T - The type of the target object.
 * @param {T} target - The target object that contains the getter method.
 * @param {string} propertyKey - The name of the property to which the decorator is applied.
 * @param {PropertyDescriptor} descriptor - The property descriptor of the getter method.
 * @returns {PropertyDescriptor} - The modified property descriptor with memoization applied to the getter method.
 * @throws {Error} - Throws an error if the decorator is applied to a property that does not have a getter method.
 *
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function Memoize<T extends { constructor: Function }>(
  target: T,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalGet = descriptor.get;

  if (!originalGet) {
    throw new Error(`Cannot apply @Memoize decorator to '${target.constructor.name}.${propertyKey}' since it has no get accessor`);
  }

  return {
    ...descriptor,
    get(this: object): unknown {
      let localMemoizationMap = GLOBAL_MEMOIZATION_MAP.get(this);
      if (!localMemoizationMap) {
        localMemoizationMap = new Map<string, unknown>();
        GLOBAL_MEMOIZATION_MAP.set(this, localMemoizationMap);
      }

      if (localMemoizationMap.has(propertyKey)) {
        return localMemoizationMap.get(propertyKey);
      }

      const value = originalGet.call(this);

      localMemoizationMap.set(propertyKey, value);

      return value;
    }
  };
}
