# Web Page Quality Checklist - 2025 Standards

**Purpose**: Table stakes for all web pages on masumihayashi.com
**Last Updated**: October 14, 2025

---

## 🔍 Core SEO (Required)

- [ ] **Title tag** - Unique, descriptive (50-60 chars)
- [ ] **Meta description** - Compelling summary (150-160 chars)
- [ ] **Meta keywords** - 5-10 relevant keywords
- [ ] **Heading hierarchy** - Proper H1, H2, H3 structure
- [ ] **Canonical URL** - Prevent duplicate content
- [ ] **Open Graph tags** - Social media preview (og:title, og:description, og:image, og:type)
- [ ] **Twitter Card tags** - Twitter-specific previews
- [ ] **Sitemap inclusion** - Page included in sitemap.xml
- [ ] **robots.txt compliance** - Not blocked from crawling

---

## 🤖 AI SEO (Emerging 2025)

- [ ] **JSON-LD Schema markup** - Article, VisualArtwork, or relevant type
- [ ] **Author schema** - Person or Organization
- [ ] **Publisher schema** - Organization with logo
- [ ] **BreadcrumbList schema** - Navigation structure
- [ ] **FAQ schema** - If page contains Q&A
- [ ] **Event schema** - If page announces event/exhibition
- [ ] **llms.txt instructions** - AI crawler guidance (site-level)

---

## 📊 Analytics (Tracking & Conversion)

- [ ] **Google Analytics 4** - Universal site tracking (G-PBJM0849KH)
- [ ] **Facebook Pixel** - Retargeting and ad campaigns (optional, configure if running ads)
- [ ] **LinkedIn Insight Tag** - B2B tracking (optional)
- [ ] **Conversion goals** - Track key actions (contact form, donations, etc.)
- [ ] **Event tracking** - Custom events for interactions
- [ ] **UTM parameters** - Campaign tracking in URLs

---

## ⚡ Performance (Speed & Efficiency)

- [ ] **Image optimization** - WebP format, max 1MB per image
- [ ] **Lazy loading** - Images below fold load on scroll
- [ ] **Responsive images** - srcset for different screen sizes
- [ ] **Font optimization** - Web fonts with font-display: swap
- [ ] **Minified CSS/JS** - Build process minimizes files
- [ ] **CDN** - Content delivery network (Netlify provides)
- [ ] **Core Web Vitals** - LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **Page size** - Total < 3MB (ideally < 1MB)
- [ ] **HTTP/2** - Modern protocol (Netlify provides)

---

## 🔒 Security (Protection & Privacy)

- [ ] **HTTPS/SSL** - Valid certificate (Netlify auto)
- [ ] **Security headers** - X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- [ ] **Content Security Policy (CSP)** - Controls resource loading
- [ ] **Referrer Policy** - Controls referrer information
- [ ] **Permissions Policy** - Restricts browser features
- [ ] **CORS headers** - Cross-origin resource sharing configured
- [ ] **Input validation** - Forms sanitize user input
- [ ] **No sensitive data exposure** - API keys, passwords protected

---

## ♿ Accessibility (A11y / WCAG 2.1 AA)

- [ ] **Semantic HTML** - Proper tags (header, nav, main, article, aside, footer)
- [ ] **Alt text** - All images have descriptive alt attributes
- [ ] **ARIA labels** - Screen reader support where needed
- [ ] **Keyboard navigation** - All interactive elements accessible via Tab
- [ ] **Focus indicators** - Visible focus states
- [ ] **Color contrast** - 4.5:1 for normal text, 3:1 for large text
- [ ] **Skip links** - "Skip to main content" for screen readers
- [ ] **Form labels** - All inputs have associated labels
- [ ] **Error messages** - Clear, descriptive error handling
- [ ] **Responsive text** - Readable at all zoom levels (up to 200%)

---

## 📱 Mobile & Responsive

- [ ] **Mobile-first design** - Works on smallest screens first
- [ ] **Viewport meta tag** - Proper mobile scaling
- [ ] **Touch targets** - Min 44x44px clickable areas
- [ ] **Mobile performance** - Fast on 3G/4G networks
- [ ] **Responsive images** - Different sizes for mobile/desktop
- [ ] **No horizontal scroll** - Content fits viewport
- [ ] **Mobile testing** - Tested on iOS and Android

---

## 🌐 Browser & Device Compatibility

- [ ] **Cross-browser testing** - Chrome, Safari, Firefox, Edge
- [ ] **Progressive enhancement** - Works without JavaScript
- [ ] **Graceful degradation** - Fallbacks for unsupported features
- [ ] **Print stylesheet** - Page prints well (optional)

---

## 🎨 UX & Design

- [ ] **Clear CTA** - Obvious next action for users
- [ ] **Consistent navigation** - Matches site-wide patterns
- [ ] **Breadcrumbs** - Shows user location (if deep page)
- [ ] **404 handling** - Broken links redirect gracefully
- [ ] **Loading states** - Indicators for async content
- [ ] **Error states** - Clear error messages
- [ ] **White space** - Readable, not cluttered
- [ ] **Typography** - Readable font size (16px minimum body text)

---

## 📝 Content Quality

- [ ] **Spelling & grammar** - Proofread content
- [ ] **Scannable** - Short paragraphs, bullet points, headings
- [ ] **Original content** - No duplicate/copied text
- [ ] **Updated dates** - Show when last modified
- [ ] **Links work** - All internal/external links valid
- [ ] **Call-to-action** - Clear next steps for users

---

## 🔧 Technical Requirements

- [ ] **Valid HTML** - Passes W3C validation
- [ ] **No console errors** - Clean JavaScript console
- [ ] **Sitemap** - XML sitemap updated
- [ ] **robots.txt** - Crawl instructions correct
- [ ] **Favicon** - Site icon present
- [ ] **404 page** - Custom error page
- [ ] **301 redirects** - Old URLs redirect properly

---

## ✅ Pre-Launch Checklist

### Before Going Live:
1. [ ] Run Lighthouse audit (score > 90 in all categories)
2. [ ] Test on mobile device (iOS + Android)
3. [ ] Validate schema markup (Google Rich Results Test)
4. [ ] Check page speed (Google PageSpeed Insights)
5. [ ] Verify analytics tracking (check in GA4)
6. [ ] Test social sharing (Facebook Debugger, Twitter Card Validator)
7. [ ] Spell check all content
8. [ ] Verify all links work
9. [ ] Check image optimization (all < 1MB)
10. [ ] Test forms (if applicable)

### After Launch:
1. [ ] Monitor Google Search Console for errors
2. [ ] Check Analytics for traffic
3. [ ] Review Core Web Vitals report
4. [ ] Set up uptime monitoring (optional)

---

## 📊 SFMOMA Landing Page Status (Example)

Status as of October 14, 2025:

### ✅ Complete
- JSON-LD Schema (Article, VisualArtwork, BreadcrumbList)
- Google Analytics 4
- Facebook Pixel (ready for Pixel ID)
- Security headers (CSP, X-Frame-Options, etc.)
- Image optimization (9.3MB → 1.1MB)
- Mobile responsive
- Semantic HTML
- Alt text
- HTTPS/SSL

### ⚠️ Needs Attention
- Facebook Pixel ID (commented out - activate when you get Pixel ID)
- Lighthouse audit (run before launch)
- Mobile device testing

### ❌ Optional/Future
- Event schema (if announcing exhibition dates)
- Conversion tracking (if tracking specific goals)
- A/B testing

---

## 🚀 Quick Commands

**Test Page**:
```bash
# Lighthouse audit
lighthouse https://masumihayashi.com/sfmoma-2025 --view

# Schema validation
curl -s https://masumihayashi.com/sfmoma-2025 | grep 'application/ld+json'

# Image optimization check
ls -lh ~/Workspace/dk-sites/mh-com-astro/public/images/*.jpg
```

**Tools**:
- Google Lighthouse: https://developers.google.com/speed/pagespeed/insights/
- Rich Results Test: https://search.google.com/test/rich-results
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator

---

## 📚 Resources

- **Schema.org**: https://schema.org/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Core Web Vitals**: https://web.dev/vitals/
- **Google Analytics**: https://analytics.google.com/
- **Netlify Docs**: https://docs.netlify.com/

---

**Maintained by**: Dean Keesey + Claude Code
**For**: Masumi Hayashi Foundation
**Version**: 1.0 (October 2025)
