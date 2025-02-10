import { StorageSerializer } from 'ngx-localstorage';

import { LabeledStateObject } from './labeled-object.model';
import { SerializationTypes } from './serialization-types.model';

export class CustomSerializer implements StorageSerializer {
  public serialize<T = unknown>(value: T): string {
    return JSON.stringify(this.formatDataToStringify({ value }));
  }

  public deserialize<T = unknown>(storedValue: string): T {
    return this.parseLabeledObjects(JSON.parse(storedValue))['value'];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private formatDataToStringify(state: any): any {
    if (state) {
      const obj = { ...state };
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object') {
          if (value instanceof Date) {
            obj[key] = this.formatLabeledObject(value, SerializationTypes.Date);
          } else if (value instanceof Map) {
            const labeled = this.formatLabeledObject(value, SerializationTypes.Map);
            labeled.data = JSON.stringify(Array.from(value.entries()));
            obj[key] = labeled;
          } else if (Array.isArray(value)) {
            const labeled = this.formatLabeledObject(value, SerializationTypes.Array);
            labeled.data = this.formatDataToStringify(value);
            obj[key] = labeled;
          } else {
            obj[key] = this.formatDataToStringify(value);
          }
        }
      });
      state = obj;
    }

    return state;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseLabeledObjects(state: Record<string, any>): Record<string, any> {
    if (state) {
      const obj = { ...state };
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object') {
          if (Object.prototype.hasOwnProperty.call(value, '__serializedType__')) {
            obj[key] = this.parseLabeledObject(value as LabeledStateObject);
          } else {
            obj[key] = this.parseLabeledObjects(value);
          }
        }
      });
      state = obj;
    }

    return state;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseLabeledObject(labeledObject: LabeledStateObject): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any;
    switch (labeledObject.__serializedType__) {
      case SerializationTypes.Date: {
        data = new Date(labeledObject.data);
        break;
      }
      case SerializationTypes.Map: {
        data = new Map(JSON.parse(labeledObject.data));
        break;
      }
      case SerializationTypes.Array: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data = Object.entries(labeledObject.data).reduce<unknown[]>((arr, entry: [string, any]) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const [index, value]: [string, any] = entry;
          arr[Number(index)] = typeof value === 'object' ? this.parseLabeledObjects(value) : value;

          return arr;
        }, []);
        break;
      }
    }

    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private formatLabeledObject(value: any, serializedType: string): LabeledStateObject {
    return new LabeledStateObject(value, serializedType);
  }
}
