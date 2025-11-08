# Artwork Individual Page - Broken Functionality Handoff

## Problem Statement

The individual artwork detail pages are currently broken. When users click on a specific photograph from the Japanese-American internment camps gallery, they should see:
1. The full artwork image
2. Details about the camp where it was taken
3. Other photographs from the same camp

**Current State:** This functionality is not working.

## User Journey (Expected)

1. User visits `/artwork/japanese-american-internment-camps/`
2. User sees grid of photographs from multiple camps
3. User clicks on a specific photograph (e.g., from Manzanar)
4. User is taken to `/artwork/japanese-american-internment-camps/[slug]` or `/camps/[slug]`
5. Page shows:
   - Full-size artwork image
   - Camp name and details (location, dates: e.g., "California • 1942-1945")
   - Other photographs from the same camp
   - Navigation to other camps

## Project Context

**Project:** masumihayashi.com - Masumi Hayashi Photography Archive
**Tech Stack:** Astro, React, TypeScript, Tailwind CSS
**Location:** `/Users/deankeesey/Workspace/dk-sites/mh-com-astro/`
**Focus:** Japanese-American internment camp photography (historical documentation)

## Related Files (Based on Previous Session Investigation)

```
src/pages/
├── artwork/
│   └── japanese-american-internment-camps/
│       ├── index.astro                    # Gallery grid (working)
│       └── [slug].astro                   # Individual artwork page (BROKEN)
├── camps/
│   ├── [slug].astro                       # Camp detail pages (check if working)
│   └── overview.astro                     # All camps overview
```

## Camp Data Structure

Based on screenshot showing "Explore All Camp Galleries":
- **Manzanar** - California • 1942-1945 • 12 photographs
- **Heart Mountain** - Wyoming • 1942-1945 • 8 photographs
- **Tule Lake** - California • 1942-1946 • 10 photographs

This suggests there's a data structure with:
```typescript
interface Camp {
  name: string;
  state: string;
  dates: string; // e.g., "1942-1945"
  photographCount: number;
  artworks: Artwork[];
}

interface Artwork {
  slug: string;
  title: string;
  campId: string;
  imageUrl: string;
  // ... other metadata
}
```

## Testing

**Test Coverage:** 32 passing tests including:
- ✅ Gallery index page loads (`/artwork/japanese-american-internment-camps/`)
- ✅ Images load successfully
- ❓ Individual artwork pages NOT tested yet (likely broken)

**Test Files:**
- `/Users/deankeesey/Workspace/dk-sites/mh-com-astro/tests/masumihayashi-smoke.spec.ts`
- `/Users/deankeesey/Workspace/dk-sites/mh-com-astro/playwright.config.ts`

## Recent Work Completed

**Previous Session:** Successfully deployed masumimuseum.com after malware cleanup
- Fixed DNS, SSL, PHP routing issues
- Created comprehensive Playwright test suites for both sites
- masumihayashi.com: 32/32 tests passing
- masumimuseum.com: 31/41 tests passing (some artwork page issues there too)

## Meta-Prompt for Next Session

```
I need to fix the broken individual artwork pages on masumihayashi.com.

**Context:**
- Project: mh-com-astro (Astro + React + TypeScript)
- Location: /Users/deankeesey/Workspace/dk-sites/mh-com-astro/
- Issue: Individual artwork detail pages are broken
- Expected functionality: When clicking a photograph from the gallery, user should see the full artwork, camp details, and related photographs from the same camp

**Current Working State:**
- Gallery index page works: /artwork/japanese-american-internment-camps/
- 32 Playwright tests passing (no tests for individual artwork pages yet)

**What I Need:**
1. Investigate why individual artwork pages ([slug].astro) are broken
2. Fix the routing/data loading issues
3. Ensure camp details and related artworks display correctly
4. Add Playwright tests for individual artwork pages
5. Verify the functionality works end-to-end

**Camp Structure Example:**
- Manzanar - California • 1942-1945 • 12 photographs
- Heart Mountain - Wyoming • 1942-1945 • 8 photographs
- Tule Lake - California • 1942-1946 • 10 photographs

Please read ARTWORK-PAGE-HANDOFF.md for complete context.
```

## Investigation Checklist for Next Session

- [ ] Check if `src/pages/artwork/japanese-american-internment-camps/[slug].astro` exists
- [ ] Check if `src/pages/camps/[slug].astro` is the correct route
- [ ] Verify data source for artworks (content collections? JSON? API?)
- [ ] Test actual URLs in browser to see error messages
- [ ] Check if slug generation matches expected URL structure
- [ ] Review camp data structure and how artworks are grouped by camp
- [ ] Add tests for individual artwork pages
- [ ] Verify related artworks display correctly

## Additional Notes

- This is a historical/archival site - accuracy and functionality are critical
- Image loading is essential (already tested and working for gallery view)
- Accessibility important (alt text already tested and passing)
- Site uses Cloudflare DNS (1.1.1.1)
- Related site: masumimuseum.com (legacy CodeIgniter PHP site with full gallery catalog)

## Success Criteria

- [ ] Individual artwork pages load without errors
- [ ] Full artwork image displays correctly
- [ ] Camp details show (name, location, dates)
- [ ] Related artworks from same camp display
- [ ] Navigation between artworks works
- [ ] Playwright tests added and passing
- [ ] All 32+ tests still passing after changes
