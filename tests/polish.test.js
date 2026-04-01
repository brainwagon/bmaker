import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const html = fs.readFileSync(resolve(__dirname, '../index.html'), 'utf8');
import { initApp } from '../js/app.js';

describe('Print & Final Polish', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    document = dom.window.document;
    
    global.document = document;
    global.window = dom.window;
    
    // Mock window.print
    dom.window.print = vi.fn();
    
    initApp();
  });

  it('should have a print button', () => {
    expect(document.getElementById('btn-print')).not.toBeNull();
  });

  it('should call window.print when print button is clicked', () => {
    const printBtn = document.getElementById('btn-print');
    printBtn.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
    expect(dom.window.print).toHaveBeenCalled();
  });
});
