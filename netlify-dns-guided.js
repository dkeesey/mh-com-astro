/**
 * Netlify DNS Setup - Guided with Existing Browser
 * Opens a visible browser that you can interact with
 */

import { chromium } from 'playwright';

async function main() {
  console.log('🚀 Opening visible browser for Netlify DNS setup...\n');

  // Launch browser in VISIBLE mode with a persistent context
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
    channel: 'chrome' // Try to use Chrome if available, falls back to Chromium
  });

  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 }
  });

  const page = await context.newPage();

  try {
    console.log('📋 Step 1: Opening Netlify domain settings...\n');
    await page.goto('https://app.netlify.com/sites/gallery-masumihayashi-com/settings/domain', {
      waitUntil: 'networkidle'
    });

    console.log('✅ Browser opened! You should see a visible window.\n');
    console.log('📝 Manual steps to complete:\n');
    console.log('1. Log in to Netlify if needed');
    console.log('2. Find "masumihayashi.com" in the custom domains list');
    console.log('3. Click "Options" → "Use Netlify DNS"');
    console.log('4. Click through the setup wizard');
    console.log('5. COPY THE 4 NAMESERVERS (dns1.p01.nsone.net, etc.)');
    console.log('6. Add DNS records:');
    console.log('   - CNAME gallery → gallery-masumihayashi-com.netlify.app');
    console.log('   - MX records (see NETLIFY-DNS-MIGRATION-GUIDE.md)');
    console.log('   - TXT records (see guide)');
    console.log('\n⏸️  Browser will stay open...');
    console.log('Press Ctrl+C when you are finished to close it.\n');

    // Keep browser open
    await new Promise(() => {}); // Never resolves, keeps browser open

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: 'netlify-error.png', fullPage: true });
  }
}

main().catch(console.error);
