import { describe, it, expect, beforeEach } from 'vitest';
import { isOverlapping, isOverflowing } from '../js/layout.js';

describe('Collision Detection Logic', () => {
  
  describe('isOverlapping', () => {
    it('should return true when two rectangles intersect', () => {
      const rect1 = { left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100 };
      const rect2 = { left: 50, top: 50, right: 150, bottom: 150, width: 100, height: 100 };
      expect(isOverlapping(rect1, rect2)).toBe(true);
    });

    it('should return false when two rectangles do not intersect', () => {
      const rect1 = { left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100 };
      const rect2 = { left: 101, top: 101, right: 201, bottom: 201, width: 100, height: 100 };
      expect(isOverlapping(rect1, rect2)).toBe(false);
    });
  });

  describe('isOverflowing', () => {
    it('should return true when child is outside parent bounds', () => {
      const parent = { left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100 };
      const child = { left: 10, top: 10, right: 110, bottom: 90, width: 100, height: 80 };
      expect(isOverflowing(child, parent)).toBe(true);
    });

    it('should return false when child is fully within parent bounds', () => {
      const parent = { left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100 };
      const child = { left: 10, top: 10, right: 90, bottom: 90, width: 80, height: 80 };
      expect(isOverflowing(child, parent)).toBe(false);
    });
  });
});
