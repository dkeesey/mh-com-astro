# Content Strategy Notes
## Shared Content Across Masumi Hayashi Sites

**Sites:** masumihayashi.com, masumimuseum.com, masumihayashifoundation.org
**Date:** 2025-10-01

---

## 🎯 Shared "About Masumi" Content Pages

These pages need to exist across all three sites with consistent information but potentially different emphasis:

### 1. **Artist Statement(s)**
- **Current Status:** Legacy statement exists on old mh.com
- **Action Needed:**
  - Review and update artist statement
  - Consider having multiple statements for different contexts (technical, personal, historical)
  - Ensure consistency across all three sites
  - **Location Suggestion:** `/artist-statement/` or `/about/statement/`

### 2. **Artist Biography**
- **Current Status:** Legacy bio exists
- **Action Needed:**
  - Update with recent information
  - Create short/medium/long versions for different contexts
  - Include key dates, achievements, exhibitions
  - **Location Suggestion:** `/about/` or `/biography/`

### 3. **Acknowledgements**
- **Current Status:** Exists on legacy mh.com, needs elegant port
- **Action Needed:**
  - ⚠️ **HIGH PRIORITY** - Port acknowledgements content elegantly
  - Maintain recognition of all contributors
  - Consider modern formatting (cards, sections, categories)
  - **Current Redirect:** `/html/acknowl.html` → `/about/` (needs dedicated page)
  - **Location Suggestion:** `/acknowledgements/` or `/about/acknowledgements/`

### 4. **Bibliography and Links**
- **Current Status:** Legacy biblio exists
- **Action Needed:**
  - Update with recent publications and references
  - Organize by category (books, articles, interviews, external links)
  - Consider adding annotations or descriptions
  - **Current Redirect:** `/html/biblio.html` → `/education/bibliography/`
  - **Location Suggestion:** Keep at `/education/bibliography/`

### 5. **Resume/CV**
- **Current Status:** User has more recent, updated version
- **Action Needed:**
  - ⚠️ **NEEDS UPDATE** - Replace legacy resume with current version
  - Format for web display (not just PDF download)
  - Consider timeline/visual format
  - **Current Redirect:** `/html/resume.html` → `/about/`
  - **Location Suggestion:** `/about/resume/` or `/cv/`

---

## 🆕 New Features Needed

### 6. **Newsletter - Gallery Show Announcements**
- **Current Status:** ❌ Never existed before
- **Action Needed:**
  - **NEW FEATURE REQUIRED**
  - Set up newsletter system (MailChimp? ConvertKit? Custom?)
  - Create signup form across all sites
  - Plan announcement schedule for gallery shows
  - Consider automated announcements when exhibitions are added
  - **Location Suggestion:**
    - Signup form: Footer or `/newsletter/`
    - Archive: `/announcements/` or `/news/`

### 7. **Contact Form**
- **Current Status:** Legacy sites used email links
- **Action Needed:**
  - Replace `mailto:` links with contact form
  - Reduce spam, improve user experience
  - Consider using Netlify Forms (built-in) or FormSpree
  - Include fields: Name, Email, Subject, Message
  - **Location Suggestion:** `/contact/`

---

## 🗑️ To Remove/Archive

### 8. **Discussion Pages**
- **Current Status:** Legacy concept, never implemented
- **Action Needed:**
  - ✅ **DECISION:** Will never be implemented
  - Remove from all site plans
  - Archive any legacy references
  - No redirect needed (likely never existed)

---

## 🏗️ Architecture Considerations

### Component-Based Approach
Create reusable components for shared content:

```
components/
  about/
    ArtistStatement.astro
    Biography.astro
    Acknowledgements.astro
    Resume.astro
  shared/
    ContactForm.astro
    NewsletterSignup.astro
```

### Content Source Options

**Option 1: Markdown/MDX Files**
- Easy to edit
- Version controlled
- Good for static content
```
content/
  about/
    artist-statement.md
    biography.md
    acknowledgements.md
```

**Option 2: Headless CMS (Future)**
- Easier for non-technical updates
- Could use Sanity, Contentful, or Strapi
- Overkill for now, but good future option

**Option 3: JSON Data Files**
- Simple for structured data
- Good for resume/timeline
```
data/
  resume.json
  acknowledgements.json
```

---

## 📋 Content Migration Priorities

### Phase 1: Essential (Do Now)
1. ✅ Artist Statement - review and update
2. ✅ Biography - update with recent info
3. ✅ **Acknowledgements - port elegantly from legacy**
4. ✅ **Resume - replace with updated version**

### Phase 2: Important (Do Soon)
5. ⭐ Contact Form - replace email links
6. ⭐ Bibliography - update and organize

### Phase 3: New Features (Plan & Implement)
7. 🆕 Newsletter signup and announcement system
8. 🆕 Automated gallery show announcements

### Phase 4: Cleanup
9. 🗑️ Remove discussion page references

---

## 🌐 Site-Specific Emphasis

### masumihayashi.com (Artist Portfolio)
- **Focus:** Artwork and artistic vision
- **Emphasis:** Artist statement, artwork galleries, exhibitions
- **Tone:** Personal, artistic, reflective

### masumimuseum.com (Museum/Archive)
- **Focus:** Preservation and education
- **Emphasis:** Complete archive, historical context, educational resources
- **Tone:** Scholarly, comprehensive, educational

### masumihayashifoundation.org (Foundation)
- **Focus:** Legacy and mission
- **Emphasis:** Foundation work, donations, educational programs
- **Tone:** Professional, mission-focused, forward-looking

---

## 🎨 Design Considerations

### Acknowledgements Page
- Consider grouping by category:
  - Financial supporters
  - Institutional partners
  - Technical contributors
  - Family and friends
  - Professional colleagues
- Use modern card/grid layout
- Include photos where appropriate
- Allow for ongoing updates

### Resume/CV
- Timeline format (chronological)
- Sections: Education, Exhibitions, Awards, Publications, Teaching
- Downloadable PDF version
- Web-friendly display version

### Contact Form
- Simple, accessible design
- Spam protection (reCAPTCHA or Netlify honeypot)
- Confirmation message after submission
- Email notification to foundation

---

## 📊 Content Audit Checklist

- [ ] Review all legacy acknowledgements
- [ ] Get updated resume from user
- [ ] Compile bibliography sources
- [ ] Review artist statements (may be multiple versions)
- [ ] Update biography with recent events
- [ ] Decide on newsletter platform
- [ ] Design contact form
- [ ] Archive discussion page references

---

## 🚀 Next Steps

1. **Immediate:** Port acknowledgements content from legacy site
2. **Immediate:** Get updated resume from user
3. **This Week:** Design acknowledgements page layout
4. **This Week:** Implement contact form
5. **Next Sprint:** Plan newsletter system
6. **Next Sprint:** Update bibliography and organize

---

## 📁 Reference Files

**Legacy Site Containers:**
- masumihayashi.com legacy: `masumihayashi-legacy-audit` (port 8085)
- masumimuseum.com legacy: `masumimuseum-final` (port 8093)

**Current Sites:**
- masumihayashi.com: `/Users/deankeesey/Workspace/dk-sites/mh-com-astro/`
- Foundation: (location TBD)
- Museum: (not yet started)
