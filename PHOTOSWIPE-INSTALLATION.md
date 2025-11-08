# PhotoSwipe Installation & Setup Guide

## Complete implementation of image zoom functionality for masumihayashi.com

---

## Step 1: Install PhotoSwipe

```bash
cd /Users/deankeesey/Workspace/dk-sites/mh-com-astro
npm install photoswipe
```

---

## Step 2: Update Your Layout

Add PhotoSwipe styles and initialization script to your main layout:

**File:** `src/layouts/Layout.astro`

```astro
---
// ... your existing imports ...
import 'photoswipe/style.css';
import '../styles/photoswipe-custom.css';
---

<html lang="en">
  <head>
    <!-- ... your existing head content ... -->
  </head>
  <body>
    <slot />

    <!-- PhotoSwipe initialization -->
    <script>
      import '../scripts/photoswipe-init.ts';
    </script>
  </body>
</html>
```

---

## Step 3: Use ZoomableCloudinaryImage Component

Replace `CloudinaryImage` with `ZoomableCloudinaryImage` on artwork pages:

### Before (CloudinaryImage)

```astro
---
import CloudinaryImage from '../components/CloudinaryImage.astro';
---

<CloudinaryImage
  cloudinaryId="samples/landscapes/nature-mountains"
  name="Mountain Landscape"
  year={2024}
  city="Yosemite"
  state="California"
  country="USA"
  media="Panoramic Photography"
  size="40 x 20 inches"
/>
```

### After (ZoomableCloudinaryImage)

```astro
---
import ZoomableCloudinaryImage from '../components/ZoomableCloudinaryImage.astro';
---

<ZoomableCloudinaryImage
  cloudinaryId="samples/landscapes/nature-mountains"
  name="Mountain Landscape"
  year={2024}
  city="Yosemite"
  state="California"
  country="USA"
  media="Panoramic Photography"
  size="40 x 20 inches"
  width={1536}
  height={1024}
/>
```

**That's it!** The component has the exact same props as CloudinaryImage.

---

## Step 4: Test Across Devices

### Desktop Testing
1. **Click image** → Should open full-screen lightbox
2. **Scroll wheel** → Should zoom in/out
3. **ESC key** → Should close lightbox
4. **Arrow keys** → Navigate gallery (if multiple images)

### Mobile Testing (iOS Safari)
1. **Tap image** → Opens lightbox
2. **Pinch-zoom** → Zooms up to 4x
3. **Double-tap** → Zooms to 2x
4. **Pan with two fingers** → Move around zoomed image
5. **Swipe down** → Close lightbox

### Mobile Testing (Android Chrome)
1. **Tap image** → Opens lightbox
2. **Pinch-zoom** → Zooms up to 4x
3. **Double-tap** → Zooms to 2x
4. **Swipe down** → Close lightbox

---

## Customization Options

### Adjust Zoom Levels

**File:** `src/scripts/photoswipe-init.ts`

```typescript
maxZoomLevel: 4,           // Change to 2 for less zoom, 6 for more
secondaryZoomLevel: 2,     // Double-tap zoom level
initialZoomLevel: 'fit',   // Or 'fill' to fill viewport
```

### Change Colors/Styling

**File:** `src/styles/photoswipe-custom.css`

```css
.pswp {
  --pswp-bg: #000000;      /* Background color */
  --pswp-icon-color: #ffffff; /* UI icon color */
}

.pswp__artwork-caption {
  background: rgba(0, 0, 0, 0.85); /* Caption background */
  color: white;                     /* Caption text color */
  border-radius: 8px;               /* Caption corners */
}
```

### Hide Caption on Zoom

Already configured! Caption fades out when user zooms in to avoid obscuring artwork.

### Disable Gestures (if needed)

**File:** `src/scripts/photoswipe-init.ts`

```typescript
pinchToClose: true,        // Set true to close on pinch-out
closeOnVerticalDrag: false, // Disable swipe-down-to-close
wheelToZoom: false,        // Disable mouse wheel zoom on desktop
```

---

## Example Pages

### Single Artwork Page

**File:** `src/pages/artwork/[slug].astro`

```astro
---
import Layout from '../../layouts/Layout.astro';
import ZoomableCloudinaryImage from '../../components/ZoomableCloudinaryImage.astro';

const { slug } = Astro.params;
// ... fetch artwork data ...
---

<Layout title={artwork.title}>
  <main>
    <ZoomableCloudinaryImage
      cloudinaryId={artwork.cloudinaryId}
      name={artwork.title}
      year={artwork.year}
      city={artwork.location.city}
      state={artwork.location.state}
      country={artwork.location.country}
      media={artwork.media}
      size={artwork.dimensions}
    />

    <div class="artwork-description">
      <p>{artwork.description}</p>
    </div>
  </main>
</Layout>
```

### Gallery Page (Multiple Images)

**File:** `src/pages/gallery/[collection].astro`

```astro
---
import Layout from '../../layouts/Layout.astro';
import ZoomableCloudinaryImage from '../../components/ZoomableCloudinaryImage.astro';

// ... fetch collection artworks ...
---

<Layout title={collection.name}>
  <main>
    <h1>{collection.name}</h1>

    <div class="gallery-grid">
      {artworks.map((artwork) => (
        <div class="gallery-item">
          <ZoomableCloudinaryImage
            cloudinaryId={artwork.cloudinaryId}
            name={artwork.title}
            year={artwork.year}
            city={artwork.location.city}
            state={artwork.location.state}
            country={artwork.location.country}
            media={artwork.media}
            size={artwork.dimensions}
          />
        </div>
      ))}
    </div>
  </main>
</Layout>
```

**Result:** Users can navigate between images using arrow keys or swipe gestures!

---

## Performance Optimization

### 1. Lazy Load PhotoSwipe

Only load PhotoSwipe when user first clicks an image:

**File:** `src/scripts/photoswipe-init.ts`

```typescript
// At the top of the file
let lightboxInitialized = false;
let lightbox: PhotoSwipeLightbox | null = null;

function initializeLightbox() {
  if (lightboxInitialized) return;

  lightbox = new PhotoSwipeLightbox({
    // ... your config ...
  });

  lightbox.init();
  lightboxInitialized = true;
}

// Listen for first click
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.closest('.zoom-trigger')) {
    initializeLightbox();
  }
}, { once: true });
```

### 2. Preload Ultra-High-Res Images

For featured artworks, add `<link rel="prefetch">`:

```astro
<head>
  <link
    rel="prefetch"
    href={imageURL3840}
    as="image"
  />
</head>
```

### 3. CloudFront CDN (Future)

When switching to AWS CloudFront, just update `baseURL`:

```typescript
const baseURL = import.meta.env.PROD
  ? "https://d1234567890.cloudfront.net/images"
  : "https://res.cloudinary.com/masumi-hayashi-foundation/image/upload";
```

---

## Troubleshooting

### Images not opening in lightbox

**Check:** Is the `zoom-trigger` class present on anchor tags?

```bash
# Inspect generated HTML
open http://localhost:4321/artwork/some-artwork
# DevTools → Elements → Find <a class="zoom-trigger">
```

### Pinch zoom not working on mobile

**Check:** Viewport meta tag in `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
```

**Note:** Don't use `user-scalable=no` - it breaks pinch zoom!

### Caption not showing

**Check:** Does your figcaption have `data-caption` attribute?

```astro
<figcaption data-caption>
  <!-- caption content -->
</figcaption>
```

### Images loading slowly when zoomed

**Cause:** 3840w images are large (6-10MB)

**Solutions:**
1. Reduce max size to 2560w if 3840w is too large
2. Use CloudFront CDN for faster delivery
3. Enable Cloudinary auto-format (WebP/AVIF)

---

## Browser Support

| Browser | Version | Zoom | Pinch | Gestures |
|---------|---------|------|-------|----------|
| Chrome | 90+ | ✅ | ✅ | ✅ |
| Safari (iOS) | 14+ | ✅ | ✅ | ✅ |
| Safari (macOS) | 14+ | ✅ | N/A | ✅ |
| Firefox | 88+ | ✅ | ✅ | ✅ |
| Edge | 90+ | ✅ | ✅ | ✅ |
| Samsung Internet | 14+ | ✅ | ✅ | ✅ |

**Coverage:** 98%+ of global users

---

## Accessibility

PhotoSwipe v5 includes:
- ✅ Keyboard navigation (ESC, arrows)
- ✅ Screen reader announcements
- ✅ Focus management
- ✅ High contrast mode support
- ✅ Reduced motion support

**WCAG 2.1 AA Compliant** (when used with proper alt text)

---

## Cost Impact

### Bandwidth (Cloudinary)

**Scenario:** 1000 monthly artwork views, 20% zoom rate

- Initial page load: 1000 × 1.5MB = 1.5GB
- Zoom loads: 200 × 8MB (3840w) = 1.6GB
- **Total:** 3.1GB/month

**Cost:** ~$0.30/month increase (Cloudinary pricing ~$0.10/GB)

**Optimization:** Most users won't zoom on every image, actual cost likely lower.

---

## Next Steps

1. ✅ Install PhotoSwipe: `npm install photoswipe`
2. ✅ Update Layout.astro with imports
3. ✅ Replace CloudinaryImage with ZoomableCloudinaryImage on artwork pages
4. ✅ Test on mobile device (iOS/Android)
5. ✅ Customize colors/styling in `photoswipe-custom.css`
6. ✅ Deploy to staging and validate with stakeholders

---

## Questions?

- **PhotoSwipe docs:** https://photoswipe.com/
- **Customization examples:** https://photoswipe.com/options/
- **GitHub:** https://github.com/dimsemenov/PhotoSwipe

---

**Estimated Implementation Time:** 30-45 minutes
**Status:** Ready to implement
**Last Updated:** 2025-10-15
