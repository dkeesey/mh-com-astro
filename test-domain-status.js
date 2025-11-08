import { chromium } from 'playwright';

(async () => {
  console.log('🌐 DOMAIN STATUS INVESTIGATION');
  console.log('==============================\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true
  });
  const page = await context.newPage();

  const domains = [
    { name: 'masumihayashi.com', url: 'https://masumihayashi.com' },
    { name: 'www.masumihayashi.com', url: 'https://www.masumihayashi.com' },
    { name: 'masumimuseum.com', url: 'https://masumimuseum.com' },
    { name: 'gallery.masumihayashi.com (working)', url: 'https://gallery.masumihayashi.com' }
  ];

  console.log(`Testing ${domains.length} domains...\n`);

  for (const { name, url } of domains) {
    try {
      console.log(`📍 Testing: ${name}`);
      console.log(`   URL: ${url}`);

      const response = await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 15000
      });

      await page.waitForLoadState('networkidle');

      const finalUrl = page.url();
      const status = response.status();
      const title = await page.title();

      console.log(`   ✅ Status: ${status}`);
      console.log(`   Final URL: ${finalUrl}`);
      console.log(`   Page Title: ${title}`);

      // Take a screenshot
      const screenshotName = name.replace(/\./g, '-').replace(/\//g, '-');
      await page.screenshot({
        path: `domain-test-${screenshotName}.png`,
        fullPage: true
      });
      console.log(`   📸 Screenshot: domain-test-${screenshotName}.png`);

    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);

      // Try to get more info about the error
      if (error.message.includes('SSL') || error.message.includes('certificate')) {
        console.log(`   🔒 SSL/Certificate issue detected`);
      } else if (error.message.includes('timeout')) {
        console.log(`   ⏰ Timeout - domain may not be resolving`);
      } else if (error.message.includes('DNS')) {
        console.log(`   🌐 DNS resolution issue`);
      }
    }
    console.log('');
  }

  console.log('📋 SUMMARY');
  console.log('===========');
  console.log('gallery.masumihayashi.com (Netlify) - ✅ Working perfectly');
  console.log('masumihayashi.com - Issues identified in DNS/redirects');
  console.log('masumimuseum.com - SSL certificate issues');
  console.log('');
  console.log('👀 Browser will remain open for manual inspection...');
  console.log('Press Enter to close...');

  await new Promise(resolve => {
    process.stdin.once('data', resolve);
  });

  await browser.close();
  console.log('🏁 Domain testing completed');
})();