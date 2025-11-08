/**
 * Netlify DNS Migration - Interactive Playwright Script
 * Migrates masumihayashi.com from DreamHost DNS to Netlify DNS
 *
 * Run with: node migrate-dns-interactive.js
 */

import { chromium } from 'playwright';
import readline from 'readline';

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('🚀 Starting Netlify DNS Migration');
  console.log('==================================\n');
  console.log('This script will open browsers in VISIBLE mode so you can watch.\n');

  // Launch browser in headed mode (visible)
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000 // Slow down actions for visibility
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // PHASE 1: Verify DreamHost DNS Records
    console.log('📋 Phase 1: DreamHost DNS Verification');
    console.log('--------------------------------------');
    console.log('Current DNS records to migrate:');
    console.log(JSON.stringify(DNS_RECORDS, null, 2));

    await askQuestion('\n⏸️  Press Enter to open DreamHost panel...');

    await page.goto(DREAMHOST_PANEL);
    await askQuestion('\n⏸️  Log in to DreamHost, then navigate to:\n   Domains → Manage Domains → DNS for masumihayashi.com\n   Press Enter when ready...');

    await page.screenshot({ path: 'dreamhost-dns-before.png', fullPage: true });
    console.log('✅ Screenshot saved: dreamhost-dns-before.png');

    // PHASE 2: Enable Netlify DNS
    console.log('\n📋 Phase 2: Enable Netlify DNS');
    console.log('--------------------------------------');

    await askQuestion('\n⏸️  Press Enter to open Netlify dashboard...');

    const netlifyPage = await context.newPage();
    await netlifyPage.goto(NETLIFY_DASHBOARD);

    await askQuestion('\n⏸️  In Netlify:\n   1. Click "Options" dropdown for masumihayashi.com\n   2. Click "Use Netlify DNS"\n   3. Press Enter when you see the nameserver configuration screen...');

    await netlifyPage.screenshot({ path: 'netlify-nameservers.png', fullPage: true });
    console.log('✅ Screenshot saved: netlify-nameservers.png');

    console.log('\n📝 You should see Netlify nameservers like:');
    console.log('   dns1.p01.nsone.net');
    console.log('   dns2.p01.nsone.net');
    console.log('   dns3.p01.nsone.net');
    console.log('   dns4.p01.nsone.net');

    await askQuestion('\n⏸️  Copy these nameservers (you\'ll need them soon)\n   Press Enter to continue...');

    // PHASE 3: Set up DNS records in Netlify
    console.log('\n📋 Phase 3: Configure DNS Records in Netlify');
    console.log('--------------------------------------');
    console.log('\n📝 Netlify will auto-create some records. Verify these exist:');
    console.log('   ✓ A record @ → Netlify load balancer');
    console.log('   ✓ CNAME www → masumihayashi.com');
    console.log('\n📝 You need to ADD these manually:');
    console.log('   1. CNAME: gallery → gallery-masumihayashi-com.netlify.app');
    console.log('   2. MX: @ → mx1.mailchannels.net (priority 0)');
    console.log('   3. MX: @ → mx2.mailchannels.net (priority 0)');
    console.log('   4. TXT: @ → google-site-verification=TKTPh2pFOx9Uxu8G89NZhy16ZCTxx2s-N7rYMOn-bVs');
    console.log('   5. TXT: @ → v=spf1 mx include:netblocks.dreamhost.com include:relay.mailchannels.net -all');

    await askQuestion('\n⏸️  Add the missing records in Netlify UI\n   Press Enter when all records are added...');

    await netlifyPage.screenshot({ path: 'netlify-dns-configured.png', fullPage: true });
    console.log('✅ Screenshot saved: netlify-dns-configured.png');

    // PHASE 4: Update Nameservers
    console.log('\n📋 Phase 4: Update Nameservers in DreamHost');
    console.log('--------------------------------------');

    await askQuestion('\n⏸️  Go back to DreamHost panel tab\n   Press Enter when ready...');

    await page.bringToFront();

    console.log('\n📝 In DreamHost:');
    console.log('   1. Go to Domains → Registrations');
    console.log('   2. Find masumihayashi.com');
    console.log('   3. Click "Nameservers" or "DNS"');
    console.log('   4. Change from DreamHost nameservers to Netlify nameservers');
    console.log('   5. Save changes');

    await askQuestion('\n⏸️  Press Enter when nameservers are updated in DreamHost...');

    await page.screenshot({ path: 'dreamhost-nameservers-updated.png', fullPage: true });
    console.log('✅ Screenshot saved: dreamhost-nameservers-updated.png');

    // PHASE 5: Verification
    console.log('\n📋 Phase 5: Verification & Monitoring');
    console.log('--------------------------------------');
    console.log('✅ Migration complete! Now we wait for:');
    console.log('   1. DNS propagation (5-30 minutes)');
    console.log('   2. SSL certificate auto-provisioning (5-10 minutes after DNS)');
    console.log('\n📊 Run this command to monitor progress:');
    console.log('   ./check-deployment-status.sh');

    await askQuestion('\n⏸️  Press Enter to close browsers and finish...');

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: 'error-screenshot.png', fullPage: true });
    console.log('Error screenshot saved: error-screenshot.png');
  } finally {
    await browser.close();
    rl.close();
    console.log('\n✅ Migration script complete!');
    console.log('Next: Run ./check-deployment-status.sh to monitor DNS/SSL');
  }
}

main().catch(console.error);
