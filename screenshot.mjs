import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 480, height: 900 } });

await page.goto('http://localhost:3099/palja', { waitUntil: 'networkidle' });

// Fill form
await page.fill('input[name="year"]', '1990');
await page.fill('input[name="month"]', '3');
await page.fill('input[name="day"]', '15');

// Submit
await page.click('button[type="submit"]');

// Wait for result
await page.waitForSelector('.font-serif-kr', { timeout: 10000 });
await page.waitForTimeout(2000); // wait for animations

// Full page screenshot
await page.screenshot({ path: '/home/user/palja-chart/result-full.png', fullPage: true });

// Crop just the report area
const reportEl = await page.$('.animate-fade-in-up');
if (reportEl) {
  await reportEl.screenshot({ path: '/home/user/palja-chart/result-report.png' });
}

await browser.close();
console.log('Screenshots saved');
