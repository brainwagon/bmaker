import { describe, it, expect } from 'vitest';
import { FONT_PAIRS } from '../js/fonts.js';

describe('Font Pairs Data', () => {
  it('should contain 10 font pairs', () => {
    expect(Object.keys(FONT_PAIRS).length).toBe(10);
  });

  it('should have the correct structure for each pair', () => {
    Object.values(FONT_PAIRS).forEach(pair => {
      expect(pair).toHaveProperty('id');
      expect(pair).toHaveProperty('name');
      expect(pair).toHaveProperty('headingFont');
      expect(pair).toHaveProperty('bodyFont');
      expect(pair).toHaveProperty('googleFontsUrl');
    });
  });

  it('should have unique IDs for each pair', () => {
    const ids = Object.values(FONT_PAIRS).map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
