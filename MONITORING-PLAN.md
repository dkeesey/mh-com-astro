# CloudFlare + Netlify Monitoring Plan

## Date: 2025-10-15
## Status: Active Protection Monitoring

---

## Weekly Monitoring (Every Monday, 9 AM)

### Cloudinary Usage Check (30 seconds)
```bash
cd /Users/deankeesey/Workspace/dk-sites/mh-com-astro
./scripts/check-cloudinary-usage.sh
```

**What to look for:**
- 🟢 Green status: <15GB (no action needed)
- 🟡 Yellow status: 15-20GB (review CloudFlare performance)
- 🟠 Orange status: 20-25GB (investigate - CloudFlare should prevent this)
- 🔴 Red status: >25GB (emergency - check CloudFlare configuration)

**Log automatically created:**
- Location: `/Users/deankeesey/Workspace/today/maintenance/cloudinary-usage-YYYY-MM.log`

---

## Optional: CloudFlare Cache Verification (2-3 minutes)

### When to run:
- After major traffic events (exhibition announcements, press coverage)
- If Cloudinary bandwidth seems higher than expected
- Monthly spot-check for peace of mind

### Command:
```bash
cd /Users/deankeesey/Workspace/dk-sites/mh-com-astro
./scripts/verify-cloudflare-cache.sh
```

**What to look for:**
- `cf-cache-status: HIT` on second request (good!)
- `cf-ray` header present (CloudFlare is serving)
- Cache hit rate should be >85% after 24 hours

---

## Monthly Review (First Monday of Month)

### 1. Check CloudFlare Analytics
**Dashboard:** https://dash.cloudflare.com/a5d1bedf3a206d66f04a37fade34c1f0/masumihayashi.com/analytics

**Review:**
- Total requests (traffic trends)
- Bandwidth served
- **Cache hit rate** (target: >85%)
- Unique visitors
- Top countries/regions

### 2. Check Netlify Analytics
**Dashboard:** https://app.netlify.com (login required)

**Review:**
- Build status (successful deployments)
- Bandwidth usage
- Edge caching performance
- Any build failures

### 3. Compare Cloudinary Usage
**Dashboard:** https://cloudinary.com/console/usage

**Calculate bandwidth savings:**
```
Without CloudFlare estimate: (Total visitors × Avg images per visit × Avg image size)
With CloudFlare actual: Check Cloudinary dashboard
Savings: (Estimate - Actual) / Estimate × 100%
```

**Target:** 70-90% savings

### 4. Document Trends
Update `CLOUDFLARE-IMPLEMENTATION-COMPLETE.md` with:
- Monthly bandwidth used
- Cache hit rate
- Any anomalies or incidents
- Traffic spikes and their sources

---

## Before Exhibition Announcements

### Pre-Announcement Checklist (2 weeks before):
- [ ] Run `./scripts/check-cloudinary-usage.sh` - verify baseline
- [ ] Check CloudFlare Page Rule status (should be active)
- [ ] Verify CloudFlare cache is working (`./scripts/verify-cloudflare-cache.sh`)
- [ ] Review emergency procedures in `CLOUDINARY-COST-RISK-MANAGEMENT.md`
- [ ] Set calendar reminder to check bandwidth 2 days after announcement

### Post-Announcement Monitoring (Day 2-7 after):
- [ ] Daily Cloudinary check (look for traffic spike)
- [ ] Check CloudFlare analytics for cache hit rate
- [ ] Verify protection is working as expected
- [ ] Document traffic patterns for future reference

---

## Alert Thresholds & Actions

| Bandwidth | Status | Action | Urgency |
|-----------|--------|--------|---------|
| <15GB | 🟢 Green | Continue weekly monitoring | Low |
| 15-20GB | 🟡 Yellow | Check CloudFlare cache hit rate | Medium |
| 20-25GB | 🟠 Orange | Investigate CloudFlare performance | High |
| >25GB | 🔴 Red | Emergency review (should not happen with CloudFlare) | Critical |

### If Bandwidth >20GB:
1. **Check CloudFlare cache hit rate** (should be >85%)
   - If <70%: Review Page Rule configuration
   - If >85%: Traffic is massive (good problem!)

2. **Check CloudFlare analytics**:
   - Identify traffic source (exhibition, press, bot traffic)
   - Verify legitimate vs bot traffic

3. **Calculate actual cost**:
   - Overage = (usage - 25GB) × $0.10/GB
   - Example: 30GB = $0.50 (minimal)
   - Example: 50GB = $2.50 (acceptable with CloudFlare reducing 70-90%)

4. **Review emergency procedures**: See `CLOUDINARY-COST-RISK-MANAGEMENT.md` Phase 4

---

## Dashboard Bookmarks

**Primary Dashboards:**
- CloudFlare Analytics: https://dash.cloudflare.com/a5d1bedf3a206d66f04a37fade34c1f0/masumihayashi.com/analytics
- Cloudinary Usage: https://cloudinary.com/console/usage
- Netlify: https://app.netlify.com

**Quick Links:**
- CloudFlare Page Rules: https://dash.cloudflare.com/a5d1bedf3a206d66f04a37fade34c1f0/masumihayashi.com/rules/page-rules
- CloudFlare Caching: https://dash.cloudflare.com/a5d1bedf3a206d66f04a37fade34c1f0/masumihayashi.com/caching/overview

---

## Automated Reminders

### Set Calendar Reminders:

**Weekly Check (Every Monday, 9 AM):**
```
Title: Check Cloudinary Bandwidth
Command: cd ~/Workspace/dk-sites/mh-com-astro && ./scripts/check-cloudinary-usage.sh
Duration: 2 minutes
Repeat: Weekly
```

**Monthly Review (First Monday, 9 AM):**
```
Title: CloudFlare + Netlify Monthly Review
Tasks:
- Check CloudFlare analytics
- Compare bandwidth trends
- Verify cache hit rate >85%
- Update monitoring docs
Duration: 15 minutes
Repeat: Monthly
```

**Before Exhibitions (2 weeks prior):**
```
Title: Pre-Announcement Bandwidth Check
Tasks:
- Run usage and cache verification scripts
- Review emergency procedures
- Set post-announcement monitoring reminders
Duration: 10 minutes
Trigger: Manual (2 weeks before exhibition dates)
```

---

## Success Metrics

### Week 1 (Oct 15-22, 2025):
- [ ] CloudFlare cache hit rate >70%
- [ ] Cloudinary bandwidth remains low (<5GB)
- [ ] No performance degradation reported
- [ ] Weekly monitoring routine established

### Month 1 (Oct 15 - Nov 15, 2025):
- [ ] Cache hit rate improved to >85%
- [ ] Cloudinary bandwidth 70-90% lower than without CloudFlare
- [ ] Zero overage charges
- [ ] Monthly review completed

### Before SFMOMA/Canton Announcements:
- [ ] Protection verified active (cache hit rate >85%)
- [ ] Baseline bandwidth documented
- [ ] Emergency procedures reviewed
- [ ] Post-announcement monitoring plan ready

---

## Incident Response

### If Something Goes Wrong:

**1. Cloudinary Overage Detected:**
- Check CloudFlare is active: `curl -I https://masumihayashi.com | grep cf-ray`
- Verify Page Rule is enabled (CloudFlare dashboard)
- Calculate actual cost (see alert thresholds table)
- Document in `CLOUDINARY-COST-RISK-MANAGEMENT.md`

**2. CloudFlare Not Caching:**
- Run `./scripts/verify-cloudflare-cache.sh`
- Check Page Rule configuration
- Purge CloudFlare cache if needed: CloudFlare Dashboard → Caching → Purge Everything
- Wait 10-15 minutes and re-test

**3. Netlify Build Failure:**
- Check GitHub Actions / Netlify logs
- Verify recent commit didn't break build
- Roll back if needed: Netlify → Deploys → Revert to previous
- Fix and redeploy

**4. Performance Degradation:**
- Check CloudFlare analytics for unusual traffic patterns
- Verify Netlify Edge is functioning
- Review recent code changes
- Test site performance: https://developers.google.com/speed/pagespeed/insights/

---

## Contact Information

**Support Resources:**
- CloudFlare Community: https://community.cloudflare.com
- Netlify Support: https://answers.netlify.com
- Cloudinary Support: https://support.cloudinary.com

**Service Status:**
- CloudFlare: https://www.cloudflarestatus.com
- Netlify: https://www.netlifystatus.com
- Cloudinary: https://status.cloudinary.com

---

## Related Documentation

- `CLOUDFLARE-IMPLEMENTATION-COMPLETE.md` - Implementation summary
- `CLOUDINARY-COST-RISK-MANAGEMENT.md` - Comprehensive risk management
- `IMPLEMENTATION-ROADMAP.md` - Phased rollout plan
- `CLOUDFLARE-SETUP-GUIDE.md` - Setup instructions
- `CLOUDINARY-ALERT-SETUP.md` - Monitoring setup

---

## Quick Reference

**Weekly Check (30 seconds):**
```bash
cd ~/Workspace/dk-sites/mh-com-astro
./scripts/check-cloudinary-usage.sh
```

**Verify Cache (2 minutes):**
```bash
./scripts/verify-cloudflare-cache.sh
```

**Check Status:**
- Cloudinary: https://cloudinary.com/console/usage
- CloudFlare: https://dash.cloudflare.com (check analytics)

**All Green?**
- ✅ Bandwidth <15GB
- ✅ Cache hit rate >85%
- ✅ No build failures
- ✅ Continue weekly monitoring

---

**Last Updated:** 2025-10-15
**Next Review:** First Monday of November 2025
