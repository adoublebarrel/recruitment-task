import {describe, expect, test} from '@jest/globals';

import {types, NAME_MAX_LENGTH} from './db';
import * as validations from './validations';

describe('Validations module', () => {
  describe('isValidApplianceType:', () => {
    
    test('returns false if arg is not a valid Appliance type', () => {
      expect(validations.isValidApplianceType('this is not a valid type')).toBeFalsy();
    });

    test('returns true if arg is a valid Appliance type', () => {
      for (const type of types) {
        expect(validations.isValidApplianceType(type)).toBeTruthy();
      }
    });
  });

  describe('isValidApplianceName', () => {
    test('returns false if not a string', () => {
      expect(validations.isValidApplianceName(null)).toBeFalsy();
      expect(validations.isValidApplianceName(123)).toBeFalsy();
    });

    test('returns false if name is too short', () => {
      expect(validations.isValidApplianceName('')).toBeFalsy();
    });

    test('retruns false if name is too long', () => {
      expect(validations.isValidApplianceName(''.padEnd(NAME_MAX_LENGTH + 1, 'a'))).toBeFalsy();
    });

    test('returns false if name contains chracters that are not alphabetical or a finger space', () => {
      expect(validations.isValidApplianceName('<script>alert("xss")</script>')).toBeFalsy();
    });

    test('returns true if name is an acceptable length and contains only alphabetical and finger spaces', () => {
      expect(validations.isValidApplianceName('The aardvark appliance')).toBeTruthy();
    });
  });

  describe('isValidApplianceId', () => {
    test('returns false if not a string', () => {
      expect(validations.isValidApplianceId(null)).toBeFalsy();
      expect(validations.isValidApplianceId(123)).toBeFalsy();
    });

    test('returns false if passed an empty string', () => {
      expect(validations.isValidApplianceId('')).toBeFalsy();
    });

    test('returns false if id is not made up of lowercase characters and numbers', () => {
      expect(validations.isValidApplianceId('<script>alert("xss")</script>')).toBeFalsy();
    });
  });
});
