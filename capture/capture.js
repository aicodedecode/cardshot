'use strict';
/* Cardshot capture: takes the first http(s) URL found in the issue title/body,
   screenshots it with headless Chromium, and writes it to shots/. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const text = (process.env.TITLE || '') + '\n' + (process.env.BODY || '');
const m = text.match(/https?:\/\/[^\s<>"']+/i);
if (!m) { console.error('No URL found in the issue title or body.'); process.exit(1); }
const url = m[0].replace(/[.,;)]+$/, '');

let parsed;
try { parsed = new URL(url); } catch (e) { console.error('Invalid URL: ' + url); process.exit(1); }
if (!/^https?:$/.test(parsed.protocol)) { console.error('Only http(s) URLs are allowed.'); process.exit(1); }

const host = parsed.hostname.toLowerCase();
const BLOCKED = ['localhost', '0.0.0.0', '::1', 'metadata.google.internal', '169.254.169.254'];
const isPrivate = BLOCKED.includes(host)
  || host.endsWith('.local') || host.endsWith('.internal')
  || /^(10\.|127\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.)/.test(host);
if (isPrivate) { console.error('Refusing to capture a private or internal address.'); process.exit(1); }

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(1500);
  fs.mkdirSync('shots', { recursive: true });
  const slug = host.replace(/[^a-z0-9.-]/gi, '-') + '-' + Date.now();
  const out = path.join('shots', slug + '.png');
  await page.screenshot({ path: out });
  await browser.close();
  console.log(out);
})().catch(e => { console.error('Capture failed: ' + e.message); process.exit(1); });
