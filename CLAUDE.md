# masumihayashi.com - Astro Site

## Quick Reference

| Property | Value |
|----------|-------|
| **Domain** | masumihayashi.com |
| **Hosting** | Cloudflare Pages |
| **Framework** | Astro |
| **Pages Project** | mh-com-astro (or similar) |
| **GitHub** | Check `.git/config` for remote |

## Infrastructure

- **CDN**: Cloudflare (automatic with Pages)
- **DNS**: Cloudflare
- **Analytics**: GA4, Microsoft Clarity, Facebook Pixel
- **Images**: Cloudinary

## SEO Configuration

- **Sitemap**: `/sitemap-index.xml` → `/sitemap-0.xml` (523 URLs)
- **robots.txt**: Allows all crawlers, blocks image AI training
- **Schema**: Person, Organization, WebSite (comprehensive)
- **IndexNow**: ✅ Configured (key: e75a841de7f54e28ac475fc56e29efab)

## Search Console Status

| Platform | Status | Notes |
|----------|--------|-------|
| Google Search Console | ✅ Registered | Performing well |
| Bing Webmaster Tools | ✅ Registered | 903 URLs discovered (2026-02-01) |

## Deployment

```bash
# Build
npm run build

# Deploy (via GitHub Actions or manual)
# Cloudflare Pages auto-deploys from main branch
```

## Key Directories

- `public/` - Static assets, verification files
- `src/pages/` - Astro routes
- `src/components/` - React/Astro components

## Related Projects

- `mhf-org/` - masumihayashifoundation.org (WordPress on DreamHost)
- `masumimuseum-astro/` - masumimuseum.com rebuild

---

**Last Updated**: 2026-02-01
