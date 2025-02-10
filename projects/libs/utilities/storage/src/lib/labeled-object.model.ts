/**
 * Model that contains deserialization meta data
 */
export class LabeledStateObject {
  public data: any;
  public readonly __serializedType__: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any, serializedType: string) {
    this.data = data;
    this.__serializedType__ = serializedType;
  }
}
