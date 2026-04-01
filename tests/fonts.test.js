/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { FONT_PAIRS, injectGoogleFonts } from '../js/fonts.js';

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

describe('injectGoogleFonts', () => {
  beforeEach(() => {
    // Clear head from any previously injected font links
    const links = document.querySelectorAll('link[id^="google-fonts-"]');
    links.forEach(link => link.remove());
  });

  it('should inject a link tag for a valid font pair ID', () => {
    const pairId = 'montserrat_merriweather';
    const pair = FONT_PAIRS[pairId];
    
    injectGoogleFonts(pairId);
    
    const link = document.getElementById(`google-fonts-${pairId}`);
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe(pair.googleFontsUrl);
    expect(link.getAttribute('rel')).toBe('stylesheet');
  });

  it('should not inject duplicate link tags for the same font pair ID', () => {
    const pairId = 'montserrat_merriweather';
    
    injectGoogleFonts(pairId);
    injectGoogleFonts(pairId);
    
    const links = document.querySelectorAll('link[id="google-fonts-montserrat_merriweather"]');
    expect(links.length).toBe(1);
  });

  it('should not inject anything for an invalid font pair ID', () => {
    injectGoogleFonts('non_existent_id');
    const links = document.querySelectorAll('link[id^="google-fonts-"]');
    expect(links.length).toBe(0);
  });

  it('should handle the "default" font pair ID by doing nothing', () => {
    injectGoogleFonts('default');
    const links = document.querySelectorAll('link[id^="google-fonts-"]');
    expect(links.length).toBe(0);
  });
});
