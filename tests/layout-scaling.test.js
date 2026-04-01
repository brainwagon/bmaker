import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const html = fs.readFileSync(resolve(__dirname, '../index.html'), 'utf8');

describe('Iterative Reduction Algorithm', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
    
    // Mock getBoundingClientRect
    dom.window.Element.prototype.getBoundingClientRect = vi.fn(function() {
        // Simple mock: if fontSize > 10, return a large width/height that overflows
        const fontSize = parseFloat(this.style.fontSize) || 16;
        return {
            width: fontSize * 10,
            height: fontSize * 2,
            top: 0,
            left: 0,
            right: fontSize * 10,
            bottom: fontSize * 2,
            x: 0,
            y: 0
        };
    });

    // Mock getComputedStyle
    dom.window.getComputedStyle = vi.fn((el) => ({
        fontSize: el.style.fontSize || '16px'
    }));
    global.window = dom.window;
  });

  it('should reduce font size until no overflow is detected', async () => {
    const { autoScaleElement } = await import('../js/layout.js');
    
    const container = { left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 };
    const element = document.createElement('div');
    element.style.fontSize = '20px';
    
    autoScaleElement(element, container);
    
    const finalFontSize = parseFloat(element.style.fontSize);
    expect(finalFontSize).toBeLessThan(20);
    expect(finalFontSize).toBeGreaterThanOrEqual(8);
  });
});
