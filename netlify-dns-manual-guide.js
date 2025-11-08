import { chromium } from 'playwright';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

(async () => {
  console.log('=== Netlify DNS Setup - Interactive Guide ===\n');

  // Launch browser in headed mode so user can watch
  const browser = await chromium.launch({
    headless: false,
    slowMo: 300
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  console.log('Step 1: Navigating to Netlify domain settings...');
  await page.goto('https://app.netlify.com/sites/gallery-masumihayashi-com/settings/domain');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  console.log('Taking initial screenshot...');
  await page.screenshot({
    path: '/Users/deankeesey/Workspace/dk-sites/mh-com-astro/netlify-manual-step1-initial.png',
    fullPage: true
  });
  console.log('Screenshot saved: netlify-manual-step1-initial.png\n');

  await question('Press Enter after you have logged in...');

  console.log('\nRefreshing page...');
  await page.reload();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: '/Users/deankeesey/Workspace/dk-sites/mh-com-astro/netlify-manual-step2-logged-in.png',
    fullPage: true
  });
  console.log('Screenshot saved: netlify-manual-step2-logged-in.png\n');

  console.log('=== INSTRUCTIONS ===');
  console.log('1. Look for "masumihayashi.com" in your custom domains');
  console.log('2. Click the "Options" button next to masumihayashi.com');
  console.log('3. Click "Use Netlify DNS"');
  console.log('4. Follow the setup wizard\n');

  await question('Press Enter after you click "Options" button...');

  await page.waitForTimeout(1000);
  await page.screenshot({
    path: '/Users/deankeesey/Workspace/dk-sites/mh-com-astro/netlify-manual-step3-options-menu.png',
    fullPage: true
  });
  console.log('Screenshot saved: netlify-manual-step3-options-menu.png\n');

  await question('Press Enter after you click "Use Netlify DNS"...');

  await page.waitForTimeout(2000);
  await page.screenshot({
    path: '/Users/deankeesey/Workspace/dk-sites/mh-com-astro/netlify-manual-step4-dns-wizard.png',
    fullPage: true
  });
  console.log('Screenshot saved: netlify-manual-step4-dns-wizard.png\n');

  console.log('=== LOOKING FOR NAMESERVERS ===');
  await question('Press Enter once you see the Netlify nameservers on screen...');

  await page.waitForTimeout(1000);
  await page.screenshot({
    path: '/Users/deankeesey/Workspace/dk-sites/mh-com-astro/netlify-manual-step5-nameservers.png',
    fullPage: true
  });
  console.log('Screenshot saved: netlify-manual-step5-nameservers.png\n');

  // Try to extract nameservers from page
  console.log('Attempting to extract nameservers from page...');
  const pageText = await page.textContent('body');
  const nameserverPattern = /dns\d+\.p\d+\.nsone\.net/gi;
  const nameservers = [...new Set(pageText.match(nameserverPattern) || [])];

  if (nameservers.length > 0) {
    console.log('\n=== NETLIFY NAMESERVERS FOUND ===');
    nameservers.forEach((ns, idx) => {
      console.log(`Nameserver ${idx + 1}: ${ns}`);
    });
    console.log('\nCopy these nameservers to your domain registrar (DreamHost)');
  } else {
    console.log('\nCould not automatically extract nameservers.');
    console.log('Please copy them manually from the browser window.');
  }

  await question('\nPress Enter to navigate to DNS records page...');

  console.log('\nNavigating to DNS records...');
  await page.goto('https://app.netlify.com/sites/gallery-masumihayashi-com/settings/domain/dns');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: '/Users/deankeesey/Workspace/dk-sites/mh-com-astro/netlify-manual-step6-dns-records.png',
    fullPage: true
  });
  console.log('Screenshot saved: netlify-manual-step6-dns-records.png\n');

  console.log('=== DNS RECORDS PAGE ===');
  console.log('This shows the auto-created DNS records for masumihayashi.com');
  console.log('You can now add any additional DNS records needed.\n');

  await question('Press Enter to take a final screenshot and close...');

  await page.screenshot({
    path: '/Users/deankeesey/Workspace/dk-sites/mh-com-astro/netlify-manual-step7-final.png',
    fullPage: true
  });
  console.log('Screenshot saved: netlify-manual-step7-final.png\n');

  console.log('=== SETUP COMPLETE ===');
  console.log('All screenshots have been saved to the project directory.');
  console.log('You can now close the browser or continue working.');

  const closeNow = await question('\nDo you want to close the browser now? (y/n): ');

  if (closeNow.toLowerCase() === 'y') {
    await browser.close();
    console.log('Browser closed.');
  } else {
    console.log('Browser will remain open. Press Ctrl+C when done to exit.');
    await page.waitForTimeout(3600000); // Wait 1 hour
  }

  rl.close();
})();
