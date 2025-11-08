import { chromium } from 'playwright';

(async () => {
  // Launch browser in headed mode so user can watch
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500 // Slow down actions so user can see what's happening
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  console.log('Step 1: Navigating to Netlify domain settings...');
  await page.goto('https://app.netlify.com/sites/gallery-masumihayashi-com/settings/domain');

  // Wait for page to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  console.log('Step 2: Taking screenshot of current domain configuration...');
  await page.screenshot({
    path: '/Users/deankeesey/Workspace/dk-sites/mh-com-astro/netlify-dns-step1-initial.png',
    fullPage: true
  });

  console.log('\n=== STEP 1 COMPLETE ===');
  console.log('Screenshot saved: netlify-dns-step1-initial.png');
  console.log('\nThe browser is now showing the Netlify domain settings page.');
  console.log('Please log in if needed, then I will continue with the automation.');
  console.log('\nWaiting 30 seconds for you to log in if necessary...');

  await page.waitForTimeout(30000);

  console.log('\nStep 3: Looking for masumihayashi.com domain...');

  // Try to find the domain in the custom domains list
  const domainExists = await page.locator('text=masumihayashi.com').count() > 0;

  if (domainExists) {
    console.log('Found masumihayashi.com in the domain list');

    // Look for Options button or dropdown near masumihayashi.com
    console.log('Step 4: Looking for Options menu for masumihayashi.com...');

    // Take a screenshot showing the domain
    await page.screenshot({
      path: '/Users/deankeesey/Workspace/dk-sites/mh-com-astro/netlify-dns-step2-domain-found.png',
      fullPage: true
    });

    console.log('Screenshot saved: netlify-dns-step2-domain-found.png');

    // Try to find and click Options button
    const optionsButton = page.locator('button:has-text("Options")').first();
    const optionsButtonExists = await optionsButton.count() > 0;

    if (optionsButtonExists) {
      console.log('Step 5: Clicking Options button...');
      await optionsButton.click();
      await page.waitForTimeout(1000);

      // Look for "Use Netlify DNS" option
      console.log('Step 6: Looking for "Use Netlify DNS" option...');
      const netlifyDnsOption = page.locator('text=/Use Netlify DNS/i');
      const netlifyDnsExists = await netlifyDnsOption.count() > 0;

      if (netlifyDnsExists) {
        console.log('Found "Use Netlify DNS" option');
        await page.screenshot({
          path: '/Users/deankeesey/Workspace/dk-sites/mh-com-astro/netlify-dns-step3-options-menu.png',
          fullPage: true
        });

        console.log('Screenshot saved: netlify-dns-step3-options-menu.png');
        console.log('\n=== ACTION REQUIRED ===');
        console.log('Please click on "Use Netlify DNS" in the browser window.');
        console.log('Waiting 20 seconds for you to click...');

        await page.waitForTimeout(20000);

        // After clicking, there might be a confirmation dialog or setup wizard
        console.log('\nStep 7: Waiting for DNS setup page...');
        await page.waitForTimeout(3000);

        // Take screenshot of DNS setup page
        await page.screenshot({
          path: '/Users/deankeesey/Workspace/dk-sites/mh-com-astro/netlify-dns-step4-dns-setup.png',
          fullPage: true
        });

        console.log('Screenshot saved: netlify-dns-step4-dns-setup.png');

        // Look for nameservers
        console.log('Step 8: Looking for Netlify nameservers...');
        const pageContent = await page.content();

        // Try to extract nameservers if visible
        const nameserverPattern = /dns\d+\.p\d+\.nsone\.net/gi;
        const nameservers = pageContent.match(nameserverPattern);

        if (nameservers && nameservers.length > 0) {
          console.log('\n=== NETLIFY NAMESERVERS FOUND ===');
          nameservers.forEach((ns, idx) => {
            console.log(`Nameserver ${idx + 1}: ${ns}`);
          });
        } else {
          console.log('\nNameservers not yet visible. They may appear after completing the setup wizard.');
        }

        console.log('\n=== WAITING FOR YOU TO COMPLETE DNS SETUP ===');
        console.log('Please follow the on-screen instructions to complete the Netlify DNS setup.');
        console.log('Once you see the nameservers, I will take a final screenshot.');
        console.log('Waiting 30 seconds...');

        await page.waitForTimeout(30000);

        // Take final screenshot
        await page.screenshot({
          path: '/Users/deankeesey/Workspace/dk-sites/mh-com-astro/netlify-dns-step5-nameservers.png',
          fullPage: true
        });

        console.log('Screenshot saved: netlify-dns-step5-nameservers.png');

        // Try to navigate to DNS records page
        console.log('\nStep 9: Attempting to navigate to DNS records...');

        // Try going directly to DNS settings
        await page.goto('https://app.netlify.com/sites/gallery-masumihayashi-com/settings/domain/dns');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);

        await page.screenshot({
          path: '/Users/deankeesey/Workspace/dk-sites/mh-com-astro/netlify-dns-step6-dns-records.png',
          fullPage: true
        });

        console.log('Screenshot saved: netlify-dns-step6-dns-records.png');

      } else {
        console.log('Could not find "Use Netlify DNS" option in the menu');
        console.log('Please manually navigate to enable Netlify DNS');
      }
    } else {
      console.log('Could not find Options button');
      console.log('The UI may have changed. Please manually enable Netlify DNS.');
    }

  } else {
    console.log('Could not find masumihayashi.com in the domain list');
    console.log('You may need to add it first or check if you are logged in.');
  }

  console.log('\n=== BROWSER LEFT OPEN ===');
  console.log('The browser window is still open for you to manually configure DNS records.');
  console.log('Press Ctrl+C in this terminal when you are done to close the browser.');

  // Keep browser open indefinitely
  await page.waitForTimeout(3600000); // Wait 1 hour (effectively keep open until user closes)

  await browser.close();
})();
