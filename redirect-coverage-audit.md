# Legacy URL Redirect Coverage Audit
## masumihayashi.com Migration

**Audit Date:** 2025-10-01
**Legacy Site:** localhost:8085
**Production Site:** https://masumihayashi.com

---

## Legacy Pages Found (11 total)

| Legacy URL | Current Redirect | Status | Notes |
|------------|------------------|--------|-------|
| `/html/acknowl.html` | `/about/` | ✅ COVERED | Acknowledgments → About |
| `/html/apology.html` | `/historical-documents/` | ✅ COVERED | Apology letter → Historical docs |
| `/html/biblio.html` | `/education/bibliography/` | ✅ COVERED | Bibliography → Education |
| `/html/bio.html` | `/about/` | ✅ COVERED | Bio → About |
| `/html/canada.html` | `/historical-documents/` | ✅ COVERED | Canada internment → Historical docs |
| `/html/eo5.html` | `/historical-documents/` | ✅ COVERED | Executive Order 5 → Historical docs |
| `/html/eo9066.html` | `/historical-documents/` | ✅ COVERED | Executive Order 9066 → Historical docs |
| `/html/famalbum.html` | `/family-album-project/` | ✅ COVERED | Family album → Project page |
| `/html/gallery.html` | `/artwork/japanese-american-internment-camps/` | ✅ COVERED | Main gallery → Artwork |
| `/html/map.html` | `/map/` | ✅ COVERED | Interactive map → Map page |
| `/html/statement.html` | ❓ UNKNOWN | ⚠️ NEEDS CHECK | Artist statement - WHERE DOES THIS GO? |

---

## Additional URLs to Check

### Family Album Sub-pages
Need to scrape `/html/famalbum.html` for individual family pages like:
- `/html/akiya.html` ✅ Already covered
- `/html/ayukawa.html` ✅ Already covered
- Others?

### Gallery Camp Pages
Need to scrape `/html/gallery.html` for camp-specific pages like:
- `/html/amache.html` ✅ Already covered
- Others?

---

## Missing Redirect

**`/html/statement.html`** - NOT COVERED
- This appears to be an artist statement page
- Should probably redirect to `/artist-statement/` or `/about/`
- **ACTION REQUIRED:** Add redirect rule

---

## Verification Commands

```bash
# Test statement.html redirect
curl -I https://masumihayashi.com/html/statement.html

# Test all 11 pages
for page in acknowl apology biblio bio canada eo5 eo9066 famalbum gallery map statement; do
  echo "Testing /html/$page.html..."
  curl -sI https://masumihayashi.com/html/$page.html | grep -E "(HTTP|location)"
done
```
