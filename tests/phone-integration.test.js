import {describe, it, expect, beforeEach, vi} from 'vitest';
import {JSDOM} from 'jsdom';
import fs from 'fs';
import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const html = fs.readFileSync(resolve(__dirname, '../index.html'), 'utf8');
import {initApp} from '../js/app.js';

describe('Phone Number UI Integration', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(html, {runScripts: 'dangerously', resources: 'usable'});
    document = dom.window.document;

    global.document = document;
    global.window = dom.window;

    // Polyfill localStorage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => {
          store[key] = value.toString();
        }),
        clear: vi.fn(() => {
          store = {};
        }),
      };
    })();
    global.localStorage = localStorageMock;

    initApp();
  });

  it('should format phone number in the input field as the user types', () => {
    const input = document.getElementById('input-phone');

    input.value = '5551234567';
    input.dispatchEvent(new dom.window.Event('input'));

    expect(input.value).toBe('+1 555-123-4567');
  });

  it('should update the card preview with the formatted phone number', () => {
    const input = document.getElementById('input-phone');
    const display = document.getElementById('card-phone-display');

    input.value = '5551234567';
    input.dispatchEvent(new dom.window.Event('input'));

    expect(display.textContent).toBe('+1 555-123-4567');
  });

  it('should handle partial input correctly in the UI', () => {
    const input = document.getElementById('input-phone');

    input.value = '5551';
    input.dispatchEvent(new dom.window.Event('input'));

    expect(input.value).toBe('+1 555-1');
  });
});
