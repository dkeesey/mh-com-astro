/**
 * Netlify DNS Migration - Interactive Playwright Script
 * Migrates masumihayashi.com from DreamHost DNS to Netlify DNS
 *
 * Run with: node migrate-to-netlify-dns.js
 */

import { chromium } from 'playwright';

// Configuration
const DREAMHOST_PANEL = 'https://panel.dreamhost.com';
const NETLIFY_DASHBOARD = 'https://app.netlify.com/sites/gallery-masumihayashi-com/settings/domain';
const DOMAIN = 'masumihayashi.com';

// Current DNS records to migrate (captured from public DNS)
const DNS_RECORDS = {
  a_records: [
    { name: '@', value: '75.2.60.5' },
    { name: '@', value: '99.83.231.61' }
  ],
  cname_records: [
    { name: 'www', value: 'masumihayashi.com' },
    { name: 'gallery', value: 'gallery-masumihayashi-com.netlify.app' }
  ],
  mx_records: [
    { priority: 0, value: 'mx1.mailchannels.net' },
    { priority: 0, value: 'mx2.mailchannels.net' }
  ],
  txt_records: [
    { name: '@', value: 'google-site-verification=TKTPh2pFOx9Uxu8G89NZhy16ZCTxx2s-N7rYMOn-bVs' },
    { name: '@', value: 'v=spf1 mx include:netblocks.dreamhost.com include:relay.mailchannels.net -all' }
  ]
};

async function pause(message) {
  console.log(`\n⏸️  PAUSED: ${message}`);
  console.log('Press Enter to continue...');
  await new Promise(resolve => {
    process.stdin.once('data', resolve);
  });
}

async function main() {
  console.log('🚀 Starting Netlify DNS Migration');
  console.log('==================================\n');

  // Launch browser in headed mode (visible)
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500 // Slow down actions for visibility
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // PHASE 1: Verify DreamHost DNS Records
    console.log('📋 Phase 1: DreamHost DNS Verification');
    console.log('--------------------------------------');
    console.log('Current DNS records to migrate:');
    console.log(JSON.stringify(DNS_RECORDS, null, 2));

    await pause('Opening DreamHost panel - you will need to log in manually');

    await page.goto(DREAMHOST_PANEL);
    await pause('After logging in, navigate to: Domains → Manage Domains → DNS for masumihayashi.com\nThen press Enter');

    await page.screenshot({ path: 'dreamhost-dns-before.png', fullPage: true });
    console.log('✅ Screenshot saved: dreamhost-dns-before.png');

    // PHASE 2: Enable Netlify DNS
    console.log('\n📋 Phase 2: Enable Netlify DNS');
    console.log('--------------------------------------');

    await pause('Opening Netlify dashboard - you may need to log in');

    const netlifyPage = await context.newPage();
    await netlifyPage.goto(NETLIFY_DASHBOARD);

    await pause('In Netlify, click "Add or register domain" → Enter "masumihayashi.com" → Continue\nThen press Enter when you see the nameserver configuration screen');

    await netlifyPage.screenshot({ path: 'netlify-nameservers.png', fullPage: true });
    console.log('✅ Screenshot saved: netlify-nameservers.png');

    await pause('Copy the Netlify nameservers shown and press Enter to continue');

    // PHASE 3: Set up DNS records in Netlify
    console.log('\n📋 Phase 3: Configure DNS Records in Netlify');
    console.log('--------------------------------------');

    await pause('Navigate to: masumihayashi.com DNS settings in Netlify\nWe will add these records one by one');

    console.log('\n📝 Records to add:');
    console.log('1. A Records (remove apex-loadbalancer, add direct IPs if needed)');
    console.log('2. CNAME: www → masumihayashi.com');
    console.log('3. CNAME: gallery → gallery-masumihayashi-com.netlify.app');
    console.log('4. MX Records for email forwarding');
    console.log('5. TXT Records for Google verification and SPF');

    await pause('Add all DNS records in Netlify UI (I can guide you through each)\nPress Enter when all records are added');

    await netlifyPage.screenshot({ path: 'netlify-dns-configured.png', fullPage: true });
    console.log('✅ Screenshot saved: netlify-dns-configured.png');

    // PHASE 4: Update Nameservers
    console.log('\n📋 Phase 4: Update Nameservers in DreamHost');
    console.log('--------------------------------------');

    await pause('Go back to DreamHost panel tab\nNavigate to: Domains → Registrations → masumihayashi.com → Nameservers\nPress Enter when ready');

    await page.bringToFront();

    await pause('Update the nameservers to Netlify\'s NS records\nPress Enter after updating');

    await page.screenshot({ path: 'dreamhost-nameservers-updated.png', fullPage: true });
    console.log('✅ Screenshot saved: dreamhost-nameservers-updated.png');

    // PHASE 5: Verification
    console.log('\n📋 Phase 5: Verification & Monitoring');
    console.log('--------------------------------------');
    console.log('Migration complete! Now we wait for:');
    console.log('1. DNS propagation (5-30 minutes)');
    console.log('2. SSL certificate auto-provisioning (5-10 minutes after DNS)');
    console.log('\nRun ./check-deployment-status.sh to monitor progress');

    await pause('Press Enter to close browsers and finish');

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: 'error-screenshot.png', fullPage: true });
    console.log('Error screenshot saved: error-screenshot.png');
  } finally {
    await browser.close();
    console.log('\n✅ Migration script complete!');
  }
}

// Handle stdin for pauses
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

main().catch(console.error);
