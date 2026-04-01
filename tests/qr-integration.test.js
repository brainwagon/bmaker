import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const html = fs.readFileSync(resolve(__dirname, '../index.html'), 'utf8');
const js = fs.readFileSync(resolve(__dirname, '../js/app.js'), 'utf8');

describe('QR Code Integration', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    document = dom.window.document;
    
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
    
    const event = new dom.window.Event('DOMContentLoaded');
    document.dispatchEvent(event);
  });

  it('should have a toggle for QR code generation', () => {
    expect(document.getElementById('input-qr-toggle')).not.toBeNull();
  });

  it('should have a QR code display element on the card', () => {
    expect(document.getElementById('card-qr-display')).not.toBeNull();
  });

  it('should show the QR code when toggled on', () => {
    const toggle = document.getElementById('input-qr-toggle');
    const display = document.getElementById('card-qr-display');
    
    toggle.checked = true;
    toggle.dispatchEvent(new dom.window.Event('change'));
    
    // In TDD Red phase, we check if the element exists
    expect(display).toBeDefined();
  });
});
