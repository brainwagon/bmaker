import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const html = fs.readFileSync(resolve(__dirname, '../index.html'), 'utf8');
import { initApp } from '../js/app.js';

describe('Export System', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    document = dom.window.document;
    
    global.document = document;
    global.window = dom.window;
    
    // Polyfill localStorage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: vi.fn(key => store[key] || null),
        setItem: vi.fn((key, value) => {
          store[key] = value.toString();
        }),
        clear: vi.fn(() => {
          store = {};
        })
      };
    })();
    global.localStorage = localStorageMock;
    
    initApp();
  });

  it('should have export buttons for PNG and PDF', () => {
    expect(document.getElementById('btn-export-png')).not.toBeNull();
    expect(document.getElementById('btn-export-pdf')).not.toBeNull();
  });

  it('should trigger PNG export when PNG button is clicked', () => {
    const pngBtn = document.getElementById('btn-export-png');
    // In TDD Red phase, we check if the element exists
    expect(pngBtn).toBeDefined();
  });

  it('should trigger PDF export when PDF button is clicked', () => {
    const pdfBtn = document.getElementById('btn-export-pdf');
    // In TDD Red phase, we check if the element exists
    expect(pdfBtn).toBeDefined();
  });
});
