# Next Steps - Masumi Hayashi Sites
## Post-Migration Action Items

**Last Updated:** 2025-10-01
**Context:** masumihayashi.com migration complete, planning for content improvements and future migrations

---

## ✅ Completed Today

- [x] masumihayashi.com DNS migration to Netlify
- [x] SSL certificates provisioned (all 3 domains)
- [x] 30 legacy URL redirects implemented and tested
- [x] Documentation created and saved to agent state
- [x] Migration knowledge preserved for masumimuseum.com

---

## 🎯 Immediate Next Steps (This Week)

### 1. Content Migration - High Priority

**Port Acknowledgements Page** (Task #368)
- Review legacy acknowledgements at: http://localhost:8085/html/acknowl.html
- Design modern layout (cards, sections, categories)
- Create `/acknowledgements/` or `/about/acknowledgements/` page
- Update redirect from `/html/acknowl.html` to new location

**Get Updated Resume** (Task #369)
- User has more recent resume to share
- Format for web display (timeline format recommended)
- Create `/about/resume/` or `/cv/` page
- Include downloadable PDF version
- Update redirect from `/html/resume.html`

### 2. Contact Form Implementation (Task #371)
- Replace all `mailto:` links with contact form
- Use Netlify Forms (built-in, free tier) or FormSpree
- Fields: Name, Email, Subject, Message
- Add spam protection (reCAPTCHA or Netlify honeypot)
- Create `/contact/` page

---

## 📋 Short-Term (Next 2 Weeks)

### 3. Content Strategy Planning (Task #367)
- Review and update Artist Statement(s)
- Update Biography with recent information
- Update Bibliography and organize by category
- Design component architecture for shared content
- Document content versioning strategy across 3 sites

### 4. Newsletter System (Task #370)
- Research newsletter platforms (MailChimp vs ConvertKit vs Custom)
- Design signup form
- Plan announcement schedule for gallery shows
- Create `/newsletter/` page with signup
- Consider automated announcements

---

## 🔧 Technical Cleanup

### 5. Remove Legacy References (Task #372)
- Archive discussion page references
- Clean up any unused legacy code
- Remove deprecated components
- Update sitemap

### 6. Docker Container Management
**Currently Running:**
```
masumimuseum-final (8093) - Keep for reference
masumimuseum-local (8092) - Keep for development
masumihayashi-legacy-audit (8085) - Keep for content reference
```

**Decision Needed:**
- Keep all containers running for content reference?
- Or shut down masumihayashi containers now that migration is complete?

---

## 🚀 Future Migrations

### masumimuseum.com Migration
**Status:** Planned (not started)
**Reference:** `~/.claude/agent-state/mh-masumimuseum-migration-plan.md`

**Pre-Work:**
1. Run legacy URL audit on port 8093
2. Review WordPress content
3. Choose modern framework
4. Design responsive image strategy

**See:** `mh-masumimuseum-migration-plan.md` for complete checklist

### masumihayashifoundation.org
**Status:** Not yet planned
**Notes:** Likely similar migration pattern to .com sites

---

## 📊 Tasks Database Summary

**Recently Added (Task IDs):**
- #367: Content Strategy (Shared content across sites)
- #368: Port Acknowledgements
- #369: Update Resume
- #370: Newsletter Strategy
- #371: Contact Form
- #372: Remove Discussion Pages

**View Tasks:**
```sql
SELECT id, title, status, priority
FROM tasks
WHERE project LIKE '%Masumi%'
ORDER BY priority DESC, created_at DESC;
```

---

## 🎨 Content Files to Create

### New Pages Needed:
```
src/pages/
  acknowledgements.astro          # NEW - port from legacy
  about/resume.astro              # NEW - user's updated resume
  contact.astro                   # NEW - replace email links
  newsletter.astro                # NEW - signup form

src/components/
  shared/
    ContactForm.astro             # NEW
    NewsletterSignup.astro        # NEW
  about/
    Acknowledgements.astro        # NEW
    Resume.astro                  # NEW
```

### Content Files:
```
content/
  about/
    acknowledgements.md           # Port from legacy
    resume.json                   # Structured data
    artist-statement.md           # Review/update
    biography.md                  # Update with recent info
```

---

## 📁 Reference Locations

**Current Site:**
`/Users/deankeesey/Workspace/dk-sites/mh-com-astro/`

**Legacy Content:**
- Acknowledgements: http://localhost:8085/html/acknowl.html
- Resume: http://localhost:8085/html/resume.html
- Statement: http://localhost:8085/html/statement.html

**Documentation:**
- Content Strategy: `CONTENT-STRATEGY-NOTES.md`
- Migration Summary: `FINAL-REDIRECT-SUMMARY.md`
- Agent State: `~/.claude/agent-state/mh-*`

**Database:**
`~/.claude/data/tasks.db`

---

## 🎯 Success Criteria

### Content Pages Complete When:
- [ ] Acknowledgements page live with all contributors recognized
- [ ] Updated resume displayed and downloadable
- [ ] Contact form working and tested
- [ ] Artist statement reviewed and current
- [ ] Biography updated with recent events
- [ ] Bibliography organized and comprehensive

### Newsletter System Complete When:
- [ ] Platform selected and configured
- [ ] Signup form on all pages (footer)
- [ ] First announcement drafted
- [ ] Automation configured (if applicable)

### Ready for masumimuseum.com When:
- [ ] Content strategy finalized
- [ ] Shared components built
- [ ] Newsletter system working
- [ ] Contact form pattern established

---

## 💡 Notes for Future Sessions

**When Working on Content:**
- Review legacy containers for original content
- Maintain consistent voice across sites
- Consider accessibility (WCAG AA minimum)
- Test on mobile devices

**When Working on Newsletter:**
- Check gallery show schedule
- Design announcement template
- Consider automation options
- Plan for subscriber management

**When Working on masumimuseum.com:**
- Reference: `~/.claude/agent-state/mh-masumimuseum-migration-plan.md`
- Use same redirect patterns as masumihayashi.com
- Reuse DNS migration procedure
- Test comprehensively before launch

---

## 📞 Questions to Resolve

1. **Resume:** Can user share updated resume file?
2. **Newsletter:** Preference for platform? (MailChimp, ConvertKit, other?)
3. **Contact Form:** Email destination for form submissions?
4. **Acknowledgements:** Any new contributors to add?
5. **Docker:** Keep legacy containers running or shut down?

---

This file tracks immediate next steps. Update as tasks are completed!
