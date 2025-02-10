import { SpectatorService, createServiceFactory } from '@ngneat/spectator';

import { CustomSerializer } from './serializer.service';

/**
 * Testing services
 * @description Use the createServiceFactory() to provide all your providers. Any dependencies the Service has can be provided here.
 *  - the createService() method allows you to override the providers in individual tests
 *  - if the service method is just a relay of events, we do not test those methods.
 *  - place your mocks in consts below the test (whenever possible: always make sure you define them before usage), this makes your spec file easier to scan and read,
 *  - see https://github.com/ngneat/spectator?tab=readme-ov-file#testing-services for more documentation on testing services
 */
describe('CustomSerializer', () => {
  let spectator: SpectatorService<CustomSerializer>;
  const createService = createServiceFactory(CustomSerializer);

  beforeEach(() => (spectator = createService()));

  // Use logical blocks to group your tests
  describe('constructor', () => {
    it('should create an instance', () => {
      expect(spectator.service).toBeDefined();
    });
  });

  // Use logical blocks to group your tests
  describe('serialize', () => {
    it('should convert a number primitive value', () => {
      const serialized = spectator.service.serialize(deserializedNumber);

      expect(serialized).toEqual(serializedNumber);
    });

    it('should convert a boolean primitive value', () => {
      const serialized = spectator.service.serialize(deserializedBoolean);

      expect(serialized).toEqual(serializedBoolean);
    });

    it('should convert a string primitive value', () => {
      const serialized = spectator.service.serialize(deserializedString);

      expect(serialized).toEqual(serializedString);
    });

    it('should convert an object with primitive value', () => {
      const serialized = spectator.service.serialize(deserializedObject);

      expect(serialized).toEqual(serializedObject);
    });

    it('should convert an Array value to labeled object', () => {
      const serialized = spectator.service.serialize(deserializedArray);

      expect(serialized).toEqual(serializedArray);
    });

    it('should convert an Map value to labeled object', () => {
      const serialized = spectator.service.serialize(deserializedMap);

      expect(serialized).toEqual(serializedMap);
    });

    it('should convert a Date value to labeled object', () => {
      const serialized = spectator.service.serialize(deserializedDate);

      expect(serialized).toEqual(serializedDate);
    });
  });

  describe('deserialize', () => {
    it('should convert a serialized number primitive value', () => {
      const deserialized = spectator.service.deserialize(serializedNumber);

      expect(deserialized).toEqual(deserializedNumber);
    });

    it('should convert a serialized a boolean primitive value', () => {
      const deserialized = spectator.service.deserialize(serializedBoolean);

      expect(deserialized).toEqual(deserializedBoolean);
    });

    it('should convert a serialized a string primitive value', () => {
      const deserialized = spectator.service.deserialize(serializedString);

      expect(deserialized).toEqual(deserializedString);
    });

    it('should convert a serialized an object with primitive value', () => {
      const deserialized = spectator.service.deserialize(serializedObject);

      expect(deserialized).toEqual(deserializedObject);
    });

    it('should convert a serialized an Array value to labeled object', () => {
      const deserialized = spectator.service.deserialize(serializedArray);

      expect(deserialized).toEqual(deserializedArray);
    });

    it('should convert a serialized an Map value to labeled object', () => {
      const deserialized = spectator.service.deserialize(serializedMap);

      expect(deserialized).toEqual(deserializedMap);
    });

    it('should convert a serialized a Date value to labeled object', () => {
      const deserialized = spectator.service.deserialize(serializedDate);

      expect(deserialized).toEqual(deserializedDate);
    });
  });
});

// mock data
const deserializedNumber = 1;
const serializedNumber = '{"value":1}';

const deserializedBoolean = true;
const serializedBoolean = '{"value":true}';

const deserializedString = 'hi';
const serializedString = '{"value":"hi"}';

const deserializedObject = { some: 'other' };
const serializedObject = '{"value":{"some":"other"}}';

const deserializedArray = [1, 2, 3];
const serializedArray = '{"value":{"data":{"0":1,"1":2,"2":3},"__serializedType__":"Array"}}';

const deserializedMap = new Map([
  ['key1', 'value'],
  ['key2', 'value']
]);
const serializedMap = `{"value":{"data":"[[\\"key1\\",\\"value\\"],[\\"key2\\",\\"value\\"]]","__serializedType__":"Map"}}`;

const deserializedDate = new Date('2024-01-31T23:00:00.000Z');
const serializedDate = '{"value":{"data":"2024-01-31T23:00:00.000Z","__serializedType__":"Date"}}';
