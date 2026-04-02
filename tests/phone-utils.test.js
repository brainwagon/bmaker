import {describe, it, expect} from 'vitest';
import {formatPhoneNumber} from '../js/phone-utils.js';

describe('formatPhoneNumber', () => {
  it('should format a 10-digit number correctly (assuming US +1)', () => {
    expect(formatPhoneNumber('5551234567')).toBe('+1 555-123-4567');
  });

  it('should format partial inputs correctly (assuming US +1)', () => {
    expect(formatPhoneNumber('5')).toBe('+1 5');
    expect(formatPhoneNumber('555')).toBe('+1 555');
    expect(formatPhoneNumber('5551')).toBe('+1 555-1');
    expect(formatPhoneNumber('555123')).toBe('+1 555-123');
    expect(formatPhoneNumber('5551234')).toBe('+1 555-123-4');
  });

  it('should strip non-digit characters and format', () => {
    expect(formatPhoneNumber('555-123-4567')).toBe('+1 555-123-4567');
    expect(formatPhoneNumber('(555) 1234567')).toBe('+1 555-123-4567');
    expect(formatPhoneNumber('555.123.4567')).toBe('+1 555-123-4567');
  });

  it('should handle explicit international country codes', () => {
    expect(formatPhoneNumber('+441234567890')).toBe('+44 1234567890');
    expect(formatPhoneNumber('+353123456789')).toBe('+353 123456789');
  });

  it('should return raw input if it contains letters and cannot be formatted as a phone number', () => {
    expect(formatPhoneNumber('call-me-now')).toBe('call-me-now');
  });

  it('should handle empty input', () => {
    expect(formatPhoneNumber('')).toBe('');
  });
});
