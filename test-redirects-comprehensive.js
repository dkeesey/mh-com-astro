import { chromium } from 'playwright';

(async () => {
  console.log('🎯 COMPREHENSIVE MASUMIHAYASHI.COM REDIRECT TESTING');
  console.log('=====================================================\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true
  });
  const page = await context.newPage();

  const baseUrl = 'https://gallery.masumihayashi.com';
  const testResults = [];

  // Test cases: [path, expectedDestination, description]
  const redirectTests = [
    // Core legacy pages
    ['/html/gallery.html', '/artwork/japanese-american-internment-camps/', 'Gallery page to artwork'],
    ['/html/eo9066.html', '/historical-documents/', 'EO 9066 to historical docs'],
    ['/html/canada.html', '/historical-documents/', 'Canada internment to historical docs'],
    ['/html/famalbum.html', '/family-album-project/', 'Family album to project page'],
    ['/html/akiya.html', '/family-album/akiya/', 'Akiya family to specific page'],
    ['/html/bio.html', '/about/', 'Bio to about page'],
    ['/html/map.html', '/map/', 'Legacy map to modern map'],

    // Root page (should stay)
    ['/', '/', 'Homepage should stay on homepage'],
  ];

  console.log(`Testing ${redirectTests.length} redirect rules...\n`);

  for (const [testPath, expectedPath, description] of redirectTests) {
    try {
      console.log(`📍 Testing: ${testPath}`);

      const response = await page.goto(`${baseUrl}${testPath}`, {
        waitUntil: 'networkidle',
        timeout: 10000
      });

      await page.waitForLoadState('networkidle');

      const finalUrl = page.url();
      const status = response.status();
      const finalPath = new URL(finalUrl).pathname;

      const success = finalPath === expectedPath || finalPath === expectedPath + '/';
      const resultIcon = success ? '✅' : '❌';

      console.log(`   ${resultIcon} Status: ${status}`);
      console.log(`   Expected: ${expectedPath}`);
      console.log(`   Got: ${finalPath}`);
      console.log(`   ${description}\n`);

      testResults.push({
        path: testPath,
        expected: expectedPath,
        actual: finalPath,
        status,
        success,
        description
      });

    } catch (error) {
      console.log(`   ❌ Error testing ${testPath}: ${error.message}\n`);
      testResults.push({
        path: testPath,
        expected: expectedPath,
        actual: 'ERROR',
        status: 0,
        success: false,
        description,
        error: error.message
      });
    }
  }

  // Additional tests for _redirects file availability
  console.log('📋 DEPLOYMENT STATUS CHECKS');
  console.log('============================\n');

  try {
    console.log('📍 Testing _redirects file availability...');
    const redirectsResponse = await page.goto(`${baseUrl}/_redirects`, { timeout: 5000 });
    const redirectsStatus = redirectsResponse.status();

    if (redirectsStatus === 200) {
      console.log('   ✅ _redirects file is accessible (deployment complete)');
    } else {
      console.log(`   ⚠️  _redirects file returns ${redirectsStatus} (deployment may be in progress)`);
    }
  } catch (error) {
    console.log(`   ❌ _redirects file test failed: ${error.message}`);
  }

  // Summary
  console.log('\n🎯 TEST RESULTS SUMMARY');
  console.log('=======================');

  const passed = testResults.filter(r => r.success).length;
  const failed = testResults.filter(r => !r.success).length;

  console.log(`✅ Passed: ${passed}/${testResults.length}`);
  console.log(`❌ Failed: ${failed}/${testResults.length}`);

  if (failed > 0) {
    console.log('\n❌ FAILED TESTS:');
    testResults.filter(r => !r.success).forEach(result => {
      console.log(`   ${result.path} → Expected: ${result.expected}, Got: ${result.actual}`);
    });
  }

  if (passed === testResults.length) {
    console.log('\n🎉 ALL REDIRECTS WORKING! masumihayashi.com is ready for DNS switch.');
  } else {
    console.log('\n⚠️  Some redirects need attention before DNS switch.');
  }

  console.log('\n📸 Screenshots saved for manual verification');
  await page.screenshot({ path: 'redirect-test-final.png', fullPage: true });

  console.log('👀 Browser will remain open for manual inspection...');
  console.log('Press Enter to close...');

  await new Promise(resolve => {
    process.stdin.once('data', resolve);
  });

  await browser.close();
  console.log('🏁 Redirect testing completed');
})();