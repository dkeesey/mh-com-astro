import { test, expect } from '@playwright/test';

/**
 * Masumi Hayashi Smoke Tests
 * Verifies all critical pages load successfully on masumihayashi.com
 * Site focuses on Japanese-American internment camp photography and family history
 */

test.describe('masumihayashi.com - Core Pages', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Masumi Hayashi/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('artist statement page loads', async ({ page }) => {
    await page.goto('/artist-statement/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('acknowledgements page loads', async ({ page }) => {
    await page.goto('/acknowledgements/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('donate page loads', async ({ page }) => {
    await page.goto('/donate/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('interviews page loads', async ({ page }) => {
    await page.goto('/interviews/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('map page loads', async ({ page }) => {
    await page.goto('/map/');
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('masumihayashi.com - Internment Camp Content', () => {
  test('Japanese-American internment camps gallery loads', async ({ page }) => {
    await page.goto('/artwork/japanese-american-internment-camps/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('camps overview page loads', async ({ page }) => {
    await page.goto('/camps/overview/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('historical documents page loads', async ({ page }) => {
    await page.goto('/historical-documents/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('family album project page loads', async ({ page }) => {
    await page.goto('/family-album-project/');
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('masumihayashi.com - Family Album Photographers', () => {
  const photographers = [
    'miyatake',
    'morioka',
    'ayukawa',
    'professional',
    'fukuyama',
    'nomura',
    'tsuyuki',
    'akiya',
  ];

  for (const photographer of photographers) {
    test(`${photographer} photographer page loads`, async ({ page }) => {
      await page.goto(`/family-album/${photographer}/`);
      await expect(page.locator('body')).toBeVisible();
    });
  }
});

test.describe('masumihayashi.com - Education', () => {
  test('bibliography page loads', async ({ page }) => {
    await page.goto('/education/bibliography/');
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('masumihayashi.com - Navigation', () => {
  test('main navigation is present', async ({ page }) => {
    await page.goto('/');

    // Check for navigation - use first() to avoid strict mode violations
    const nav = page.locator('nav, header, [role="navigation"]').first();
    await expect(nav).toBeVisible();
  });

  test('can navigate to about page', async ({ page }) => {
    await page.goto('/');

    // Look for about link and click it
    const aboutLink = page.locator('a[href*="about"]').first();
    const linkCount = await aboutLink.count();

    if (linkCount > 0) {
      await aboutLink.click();
      await expect(page).toHaveURL(/\/about/);
    }
  });
});

test.describe('masumihayashi.com - Image Loading', () => {
  test('internment camp gallery has working images', async ({ page }) => {
    const brokenImages: string[] = [];

    page.on('response', response => {
      if (response.url().match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
        if (response.status() !== 200) {
          brokenImages.push(response.url());
        }
      }
    });

    await page.goto('/artwork/japanese-american-internment-camps/');

    // Check images exist
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    // Check no broken image requests
    expect(brokenImages).toHaveLength(0);

    // Check first 5 images loaded successfully (sample testing)
    const firstFive = await images.all();
    for (let i = 0; i < Math.min(5, firstFive.length); i++) {
      const loaded = await firstFive[i].evaluate((el: HTMLImageElement) =>
        el.complete && el.naturalWidth > 0
      );
      expect(loaded).toBe(true);
    }
  });

  test('family album page has working images', async ({ page }) => {
    const brokenImages: string[] = [];

    page.on('response', response => {
      if (response.url().match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
        if (response.status() !== 200) {
          brokenImages.push(response.url());
        }
      }
    });

    await page.goto('/family-album/miyatake/');

    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    expect(brokenImages).toHaveLength(0);
  });

  test('artwork images have alt text for accessibility', async ({ page }) => {
    await page.goto('/artwork/japanese-american-internment-camps/');

    // All images should have alt attributes (even if empty for decorative)
    const images = page.locator('img');
    const count = await images.count();

    if (count > 0) {
      // Check first 5 images have alt attribute
      const firstFive = await images.all();
      for (let i = 0; i < Math.min(5, firstFive.length); i++) {
        const hasAlt = await firstFive[i].getAttribute('alt');
        expect(hasAlt).not.toBeNull();
      }
    }
  });

  test('artwork images meet minimum quality threshold', async ({ page }) => {
    await page.goto('/artwork/japanese-american-internment-camps/');

    // Get all images
    const images = page.locator('img');
    const count = await images.count();

    if (count > 0) {
      // Sample test: check first image meets quality threshold
      const firstImg = images.first();
      const width = await firstImg.evaluate((el: HTMLImageElement) => el.naturalWidth);

      // Art images should be at least 400px wide for quality viewing
      // (lower threshold to account for thumbnails, but real artwork should be much larger)
      expect(width).toBeGreaterThan(400);
    }
  });
});

test.describe('masumihayashi.com - Performance & Accessibility', () => {
  test('no console errors on homepage', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');

    // Allow for some third-party errors, but check critical ones
    const criticalErrors = errors.filter(err =>
      !err.includes('extension') &&
      !err.includes('chrome-')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('no 404 errors on homepage', async ({ page }) => {
    const failedRequests: string[] = [];

    page.on('response', response => {
      if (response.status() === 404) {
        failedRequests.push(response.url());
      }
    });

    await page.goto('/');

    // Filter out expected missing resources
    const criticalFailures = failedRequests.filter(url =>
      !url.includes('favicon') &&
      !url.includes('robots.txt')
    );

    expect(criticalFailures.length).toBe(0);
  });

  test('page loads within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load in under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });
});

test.describe('masumihayashi.com - Legacy Redirects', () => {
  const legacyUrls = [
    { from: '/html/resume.html', shouldRedirect: true },
    { from: '/html/statement.html', shouldRedirect: true },
    { from: '/html/bio.html', shouldRedirect: true },
  ];

  for (const urlTest of legacyUrls) {
    test(`legacy URL ${urlTest.from} is handled`, async ({ page }) => {
      const response = await page.goto(urlTest.from, {
        waitUntil: 'networkidle'
      });

      // Should either redirect (3xx) or load successfully (200)
      expect([200, 301, 302, 303, 307, 308]).toContain(response?.status() || 0);
    });
  }
});
