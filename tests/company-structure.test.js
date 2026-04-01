import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const html = fs.readFileSync(resolve(__dirname, '../index.html'), 'utf8');

describe('Company Name Structure', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  it('should have a company name input field', () => {
    expect(document.getElementById('input-company')).not.toBeNull();
  });

  it('should have a company name display element on the card', () => {
    expect(document.getElementById('card-company-display')).not.toBeNull();
  });
});
