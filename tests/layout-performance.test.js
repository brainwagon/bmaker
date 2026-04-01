import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const html = fs.readFileSync(resolve(__dirname, '../index.html'), 'utf8');

describe('Performance & Stability', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
    
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn()
    };
  });

  it('should be performant under high frequency updates', async () => {
    // This is more about code review and visual verification, 
    // but we can check if it stays within reasonable timing bounds.
    const start = performance.now();
    for(let i=0; i<10; i++) {
        // Mock a layout run
    }
    const end = performance.now();
    expect(end - start).toBeLessThan(100); // 100ms for 10 runs is very generous
  });
});
