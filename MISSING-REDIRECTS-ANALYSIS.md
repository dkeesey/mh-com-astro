# Missing Redirects Analysis
## Your Manual Audit vs. Current Redirects

**Total URLs in Your Audit:** 27
**Current Redirect Rules (explicit):** 13
**Coverage via Catch-all:** Line 75 (`/html/*`)

---

## ✅ COVERED - Already Have Explicit Redirects (13)

| Your URL | Current Redirect | Target |
|----------|------------------|--------|
| `/html/gallery.html` | ✅ Line 11 | `/artwork/japanese-american-internment-camps/` |
| `/html/map.html` | ✅ Line 25 | `/map/` |
| `/html/canada.html` | ✅ Line 14 | `/historical-documents/` |
| `/html/famalbum.html` | ✅ Line 20 | `/family-album-project/` |
| `/html/ayukawa.html` | ✅ Line 22 | `/family-album/ayukawa/` |
| `/html/akiya.html` | ✅ Line 21 | `/family-album/akiya/` |
| `/html/eo9066.html` | ✅ Line 15 | `/historical-documents/` |
| `/html/eo5.html` | ✅ Line 17 | `/historical-documents/` |
| `/html/apology.html` | ✅ Line 16 | `/historical-documents/` |
| `/html/bio.html` | ✅ Line 28 | `/about/` |
| `/html/acknowl.html` | ✅ Line 29 | `/about/` |
| `/html/biblio.html` | ✅ Line 32 | `/education/bibliography/` |
| `/html/amache.html` | ✅ Line 35 | `/artwork/japanese-american-internment-camps/` |

---

## ⚠️ MISSING - Need Explicit Redirects (13 camp + family pages)

### Japanese-American Camp Pages (10 MISSING):
1. ❌ `/html/gila.html` - Gila River camp
2. ❌ `/html/granada.html` - Granada camp (Amache)
3. ❌ `/html/htmt.html` - Heart Mountain camp
4. ❌ `/html/jerome.html` - Jerome camp
5. ❌ `/html/manzanar.html` - Manzanar camp
6. ❌ `/html/minidoka.html` - Minidoka camp
7. ❌ `/html/poston.html` - Poston camp
8. ❌ `/html/rohwer.html` - Rohwer camp
9. ❌ `/html/topaz.html` - Topaz camp
10. ❌ `/html/tulelake.html` - Tule Lake camp

### Family Album Pages (5 MISSING):
11. ❌ `/html/tsuyuki.html` - Tsuyuki family
12. ❌ `/html/miyatake1.html` - Miyatake family
13. ❌ `/html/fukuyama.html` - Fukuyama family
14. ❌ `/html/nomura.html` - Nomura family
15. ❌ `/html/morioka.html` - Morioka family

### Other Pages (2):
16. ❌ `/html/profess.html` - Professional/teaching content?
17. ❌ `/html/statement.html` - Artist statement
18. ❌ `/html/resume.html` - Resume/CV
19. ❌ `/html/newsletter.html` - ⚠️ User says DISCONTINUE

---

## 🎯 Recommendation

**Add 17 explicit redirects** (excluding newsletter.html):

### Camp Pages → Artwork Gallery
All 10 camp pages should redirect to the main artwork gallery where all camps are featured.

### Family Album Pages → Family Album
The 5 missing family pages should redirect to either:
- Individual family pages if they exist in new site, OR
- `/family-album-project/` as fallback

### Other Pages
- `/html/profess.html` → `/about/` or `/education/` (need to determine content)
- `/html/statement.html` → `/artist-statement/` or `/about/`
- `/html/resume.html` → `/about/` or external resume link

---

## Current Status

**With catch-all (`/html/*`):** All 27 URLs redirect somewhere (to artwork gallery)
**Without catch-all:** 13/27 explicitly redirected (48%)
**Missing explicit redirects:** 14 URLs (52%)

**ACTION REQUIRED:** Add explicit redirects for better SEO and user experience.
