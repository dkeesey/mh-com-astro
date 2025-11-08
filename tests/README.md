# Masumi Hayashi Playwright Tests

Comprehensive smoke tests for **masumihayashi.com** (Astro site).

## Quick Start

```bash
# Install dependencies (if not already installed)
npm install

# Run all tests
npm run test

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in UI mode (interactive)
npx playwright test --ui

# Run specific test file
npx playwright test masumihayashi-smoke

# View test report
npx playwright show-report
```

## Test Coverage

### Core Pages (7 pages)
- ✅ Homepage
- ✅ About page
- ✅ Artist Statement
- ✅ Acknowledgements
- ✅ Donate
- ✅ Interviews
- ✅ Map

### Internment Camp Content (4 pages)
- ✅ Japanese-American Internment Camps gallery
- ✅ Camps overview
- ✅ Historical documents
- ✅ Family Album Project

### Family Album Photographers (8 photographers)
- ✅ Miyatake
- ✅ Morioka
- ✅ Ayukawa
- ✅ Professional
- ✅ Fukuyama
- ✅ Nomura
- ✅ Tsuyuki
- ✅ Akiya

### Education (1 page)
- ✅ Bibliography

### Navigation (2 tests)
- ✅ Main navigation present
- ✅ Can navigate between pages

### Image Loading (4 tests)
- ✅ Internment camp gallery images load successfully
- ✅ Family album page images load successfully
- ✅ All artwork images have alt text (accessibility)
- ✅ Artwork images meet minimum quality threshold (>400px)

### Performance & Accessibility (3 tests)
- ✅ No console errors
- ✅ No 404 errors
- ✅ Page load time < 5 seconds

### Legacy Redirects (3 tests)
- ✅ /html/resume.html handled
- ✅ /html/statement.html handled
- ✅ /html/bio.html handled

**Total: 32 tests**

## Test Structure

```
tests/
├── masumihayashi-smoke.spec.ts   # Main smoke tests
└── README.md                      # This file
```

## Configuration

Tests are configured via `playwright.config.ts` in the project root.

- **Base URL:** https://masumihayashi.com
- **Timeout:** 30 seconds per test
- **Retries:** 2 on CI, 0 locally
- **Screenshots:** On failure only
- **Trace:** On first retry

## CI/CD Integration

These tests can be integrated into GitHub Actions or other CI systems:

```yaml
- name: Run Playwright tests
  run: npm run test
```

## Debugging Failed Tests

1. **View test report:**
   ```bash
   npx playwright show-report
   ```

2. **Run in headed mode:**
   ```bash
   npx playwright test --headed
   ```

3. **Debug specific test:**
   ```bash
   npx playwright test --debug masumihayashi-smoke
   ```

4. **View traces:**
   - After a test run, open the HTML report
   - Click on a failed test
   - View the trace timeline

## Adding New Tests

1. Open `tests/masumihayashi-smoke.spec.ts`
2. Add new test in appropriate `test.describe()` block
3. Run tests to verify

Example:
```typescript
test('new page loads', async ({ page }) => {
  await page.goto('/new-page');
  await expect(page).toHaveTitle(/Expected Title/);
});
```

## Notes

- Tests run in parallel by default
- Tests are retried automatically on failure in CI
- Screenshots and traces are captured on failure
- All tests use the production site (https://masumihayashi.com)
