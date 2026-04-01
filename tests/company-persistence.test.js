import {describe, it, expect, beforeEach, vi} from 'vitest';
import {JSDOM} from 'jsdom';
import fs from 'fs';
import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';
import * as fonts from '../js/fonts.js';

// Mock fonts to avoid hangs in JSDOM
vi.mock('../js/fonts.js', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    injectGoogleFonts: vi.fn(() => Promise.resolve()),
  };
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const html = fs.readFileSync(resolve(__dirname, '../index.html'), 'utf8');
import {initApp} from '../js/app.js';

describe('Company Name Persistence', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(html, {runScripts: 'dangerously', resources: 'usable'});
    document = dom.window.document;

    global.document = document;
    global.window = dom.window;

    // Mock localStorage
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
  });

  it('should save the company name to localStorage', async () => {
    initApp();
    const input = document.getElementById('input-company');
    input.value = 'Acme Persistence Corp';
    input.dispatchEvent(new dom.window.Event('input'));

    // Wait for debounce
    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(global.localStorage.setItem).toHaveBeenCalled();
    const savedData = JSON.parse(global.localStorage.setItem.mock.calls[0][1]);
    expect(savedData.company).toBe('Acme Persistence Corp');
  });

  it('should restore the company name from localStorage', async () => {
    const mockState = {
      name: 'John Restored',
      company: 'Restored Acme Corp'
    };
    global.localStorage.getItem.mockReturnValue(JSON.stringify(mockState));
    
    initApp();
    // Wait for async load
    await new Promise((res) => setTimeout(res, 100));

    expect(document.getElementById('input-company').value).toBe('Restored Acme Corp');
    expect(document.getElementById('card-company-display').textContent).toBe('Restored Acme Corp');
  });
});
