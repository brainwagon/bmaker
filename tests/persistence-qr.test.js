import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const html = fs.readFileSync(resolve(__dirname, '../index.html'), 'utf8');
import { initApp } from '../js/app.js';

describe('QR Persistence', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    document = dom.window.document;
    
    global.document = document;
    global.window = dom.window;
    
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

    // Mock qrcode-generator
    global.qrcode = (typeNumber, errorCorrectionLevel) => ({
      addData: vi.fn(),
      make: vi.fn(),
      createImgTag: vi.fn(() => '<img src="mock-qr">')
    });
  });

  it('should save the QR toggle state to localStorage', async () => {
    initApp();
    const toggle = document.getElementById('input-qr-toggle');
    toggle.checked = true;
    toggle.dispatchEvent(new dom.window.Event('change'));

    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 600));

    expect(global.localStorage.setItem).toHaveBeenCalled();
    const savedData = JSON.parse(global.localStorage.getItem('bmaker_state'));
    expect(savedData.qrEnabled).toBe(true);
  });

  it('should restore the QR state from localStorage on init', () => {
    global.localStorage.setItem('bmaker_state', JSON.stringify({ qrEnabled: true }));
    
    initApp();
    
    expect(document.getElementById('input-qr-toggle').checked).toBe(true);
    expect(document.getElementById('card-qr-display').classList.contains('active')).toBe(true);
  });
});
