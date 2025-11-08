# Image Zoom Implementation Plan for masumihayashi.com

## Goal
Replicate the zoom functionality from catalog.masumihayashifoundation.org (Gatsby) in the new Astro site, enabling users to click/tap images and zoom in to view high-resolution details.

## Current State
- ✅ CloudinaryImage component with 6 responsive sizes (640w-1920w)
- ✅ Proper srcset implementation
- ✅ Dynamic text overlays (title, location, copyright)
- ❌ No zoom/lightbox functionality

## Target Behavior
Users should be able to:
1. Click/tap on artwork images
2. View full-screen/modal overlay
3. Pinch-zoom on mobile (or scroll-zoom on desktop)
4. Load ultra-high-res images (2560w-3840w) progressively
5. Pan around zoomed images to examine details
6. Close with ESC key or swipe down

## Solution Options

### Option 1: PhotoSwipe (Recommended for Art Galleries)
**Best for:** Professional art catalogs, museum sites, photography portfolios

**Pros:**
- Industry standard for art galleries
- Full mobile gesture support (pinch, pan, swipe)
- Gallery navigation (prev/next)
- Progressive high-res loading
- Up to 4x zoom
- Keyboard navigation
- 19KB gzipped

**Cons:**
- More complex setup
- Larger file size

**Implementation:** See `PHOTOSWIPE-IMPLEMENTATION.md`

---

### Option 2: medium-zoom (Recommended for Simplicity)
**Best for:** Simple zoom functionality, similar to Medium.com

**Pros:**
- Tiny (3KB gzipped)
- Simple setup
- Works with srcset
- Framework-agnostic
- Actively maintained

**Cons:**
- Click-to-zoom only (no pinch gestures)
- Less mobile-optimized
- No gallery navigation

**Implementation:** See `MEDIUM-ZOOM-IMPLEMENTATION.md`

---

### Option 3: React Image Lightbox (If Using React Islands)
**Best for:** If already using React components heavily

**Pros:**
- Full React integration
- Good mobile support
- Customizable UI

**Cons:**
- Requires React
- Heavier than medium-zoom
- More complex state management

---

## Recommended Approach: PhotoSwipe

Given this is an art catalog where users need to examine artwork details, PhotoSwipe provides the professional experience expected for museum/gallery sites.

### Implementation Steps

1. **Install PhotoSwipe**
   ```bash
   npm install photoswipe
   ```

2. **Create ZoomableCloudinaryImage component** (extends current CloudinaryImage)
   - Add ultra-high-res URLs (2560w, 3840w)
   - Wrap image in anchor tag with PhotoSwipe data attributes
   - Add cursor styling

3. **Add PhotoSwipe initialization** (in Layout.astro)
   - Import CSS and JS
   - Configure zoom settings
   - Add custom caption display

4. **Test across devices**
   - Desktop: Click to zoom, scroll to zoom in/out
   - Mobile: Tap to zoom, pinch to zoom
   - Tablet: Touch gestures

5. **Performance optimization**
   - Lazy load PhotoSwipe JS until first image click
   - Preload only 1-2 adjacent images
   - Cache ultra-high-res images with long TTL

### File Structure
```
src/
├── components/
│   ├── CloudinaryImage.astro (existing)
│   └── ZoomableCloudinaryImage.astro (new)
├── layouts/
│   └── Layout.astro (add PhotoSwipe init)
└── styles/
    └── photoswipe-custom.css (optional customization)
```

---

## Alternative: Test Both and Decide

1. Implement medium-zoom first (30 minutes)
2. Test with stakeholders
3. If more features needed, upgrade to PhotoSwipe (2 hours)

This progressive approach validates UX before committing to larger library.

---

## Next Steps

1. **Inspect Gatsby catalog site** to confirm zoom library
   - Open DevTools → Sources tab
   - Look for `medium-zoom`, `photoswipe`, or `react-image-lightbox`

2. **Choose implementation approach**
   - Quick win: medium-zoom
   - Professional: PhotoSwipe

3. **Implement chosen solution**
   - Follow detailed guides in respective implementation files

4. **Test and iterate**
   - Mobile devices (iOS Safari, Android Chrome)
   - Desktop browsers (Chrome, Firefox, Safari)
   - Accessibility (keyboard navigation, screen readers)

---

## Performance Considerations

### Current Image Sizes
- 640w, 768w, 1024w, 1280w, 1536w, 1920w

### Add for Zoom
- 2560w (for 4K displays)
- 3840w (for extreme zoom/detail examination)

### Loading Strategy
- **Initial page load:** Serve appropriate size via srcset (640w-1920w)
- **Zoom trigger:** Load 3840w only when user clicks/taps
- **Progressive:** Show lower-res while high-res loads

### Cloudinary Caching
All zoom images should be cached at CDN edge after first request. Consider pre-warming cache for featured artworks.

---

## Cost Impact (Cloudinary/AWS)

### Scenario: 1000 monthly artwork views, 20% click to zoom

**Current bandwidth:**
- Page load: 1000 views × 1.5MB avg = 1.5GB

**With zoom (PhotoSwipe):**
- Page load: 1000 views × 1.5MB = 1.5GB
- Zoom loads: 200 zooms × 8MB (3840w) = 1.6GB
- **Total:** 3.1GB/month (~$0.30 increase)

Negligible cost increase for significant UX improvement.

---

## Timeline Estimates

### medium-zoom
- Implementation: 30 minutes
- Testing: 15 minutes
- **Total:** 45 minutes

### PhotoSwipe
- Implementation: 2 hours
- Custom styling: 30 minutes
- Testing: 30 minutes
- **Total:** 3 hours

---

## Success Metrics

After implementation, verify:
- ✅ Images zoom to full-screen on click/tap
- ✅ High-res images load progressively (no janky swap)
- ✅ Mobile gestures work (pinch, pan, swipe)
- ✅ Keyboard navigation works (ESC to close, arrows for gallery)
- ✅ Performance: First zoom loads within 1 second
- ✅ Accessibility: Screen reader announces zoom state
- ✅ No layout shift when zooming

---

## Future Enhancements (Post-Launch)

1. **Gallery mode** - Navigate between artworks without closing zoom
2. **Share button** - Share specific artwork from lightbox
3. **Comparison mode** - View two artworks side-by-side
4. **Virtual tour** - Auto-advance through collection
5. **AI zoom** - Super-resolution beyond original file size

---

## References

- PhotoSwipe: https://photoswipe.com/
- medium-zoom: https://github.com/francoischalifour/medium-zoom
- Gatsby Image: https://www.gatsbyjs.com/plugins/gatsby-plugin-image/
- Astro Islands: https://docs.astro.build/en/concepts/islands/

---

Last Updated: 2025-10-15
Status: Planning
Owner: Dean Keesey
