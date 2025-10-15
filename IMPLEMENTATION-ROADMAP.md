# Implementation Roadmap - Masumi Hayashi Site Enhancements

## Overview
This roadmap consolidates all planned enhancements for masumihayashi.com, organized by priority and dependencies. Each phase has clear prerequisites, implementation guides, and success criteria.

**Last Updated:** 2025-10-15
**Status:** Ready for execution

---

## Phase 1: Immediate Protection (This Week)

### 1A. Cloudinary Usage Alerts ⚡ 5 MINUTES
**Purpose:** Early warning system to prevent surprise bandwidth bills
**Priority:** 🔥 CRITICAL
**Cost:** $0
**Prerequisites:** None

**Implementation:**
- Guide: `CLOUDINARY-ALERT-SETUP.md`
- Steps:
  1. Login to Cloudinary console
  2. Enable bandwidth alerts at 20GB threshold
  3. Set up weekly monitoring routine
  4. Document baseline usage

**Success Criteria:**
- ✅ Email alerts configured at 20GB
- ✅ Weekly calendar reminder set
- ✅ Baseline usage documented

**Timeline:** Complete today (5 minutes)

---

### 1B. CloudFlare CDN Setup ⚡ 30-45 MINUTES
**Purpose:** Free bandwidth protection (70-90% reduction)
**Priority:** 🔥 HIGH - Before exhibition announcements
**Cost:** $0 (free plan, forever)
**Prerequisites:** None

**Implementation:**
- Guide: `CLOUDFLARE-SETUP-GUIDE.md`
- Steps:
  1. Create CloudFlare account (free)
  2. Add masumihayashi.com domain
  3. Update nameservers at DreamHost
  4. Configure Page Rules for image caching
  5. Wait for DNS propagation (2-4 hours)
  6. Verify cache hit rate

**Success Criteria:**
- ✅ CloudFlare serving site traffic
- ✅ Cache hit rate >85% after 24 hours
- ✅ Cloudinary bandwidth reduction visible in dashboard

**Timeline:** Setup today, verify tomorrow

**Impact:**
- 10,000 artwork views = 15GB → 1.5GB Cloudinary bandwidth
- Protection against viral traffic spikes
- No code changes required

---

## Phase 2: Feature Enhancement (When Ready)

### 2A. PhotoSwipe Zoom Implementation ⚡ 1-2 HOURS
**Purpose:** Professional artwork viewing with mobile gesture support
**Priority:** 🟡 MEDIUM - After CloudFlare protection active
**Cost:** $0 (open source)
**Prerequisites:** CloudFlare CDN active (bandwidth protection)

**Implementation:**
- Files created:
  - `src/components/ZoomableCloudinaryImage.astro` ✅
  - `src/scripts/photoswipe-init.ts` ✅
  - `src/layouts/Layout.astro` (updated) ✅
- Dependencies: `npm install photoswipe` ✅

**Key Features:**
- Mobile pinch-zoom, double-tap, swipe gestures
- Desktop scroll-wheel zoom
- Ultra-high-res images (2560w, 3840w) on zoom
- All Cloudinary transformations preserved (text overlays, borders)

**Success Criteria:**
- ✅ Zoom works on mobile (pinch, double-tap, swipe)
- ✅ Zoom works on desktop (click, scroll-wheel)
- ✅ Text overlays visible in zoom view
- ✅ Bandwidth remains under CloudFlare protection

**Testing Checklist:**
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Test on desktop browsers (Chrome, Firefox, Safari)
- [ ] Verify CloudFlare cache hit rate remains >85%
- [ ] Monitor Cloudinary bandwidth for 7 days

**Timeline:** 1-2 hours implementation, 7 days monitoring

**Bandwidth Impact (with CloudFlare):**
- Before: 100 zoom clicks = 800MB Cloudinary bandwidth
- After: 100 zoom clicks = 80MB Cloudinary bandwidth (90% cached)

**Rollback Plan:**
If bandwidth spikes unexpectedly:
1. Reduce zoom size from 3840w to 2560w (50% bandwidth reduction)
2. If still high, disable zoom feature temporarily (comment out PhotoSwipe in Layout.astro)

---

## Phase 3: IRS-Dependent (3-6 Months)

### 3A. Monitor IRS 501(c)(3) Reinstatement
**Purpose:** Unlock TechSoup nonprofit credits
**Priority:** ⏳ WAITING - No action needed
**Cost:** $0
**Prerequisites:** Application submitted Oct 2025

**Status:**
- Application submitted for reinstatement (3 missing 990-N forms)
- Processing timeline: 3-6 months
- Worker agent delegated to monitor status

**Next Actions (after approval):**
1. Receive IRS reinstatement letter
2. Update Foundation records
3. Proceed to Phase 3B (TechSoup credits)

---

### 3B. TechSoup AWS Credits Application
**Purpose:** Access $2000 AWS credits for $175
**Priority:** ⏳ BLOCKED - Requires active 501(c)(3) status
**Cost:** $175 (one-time fee)
**Value:** $2000 AWS credits
**Prerequisites:** IRS 501(c)(3) reinstatement approved

**Implementation:**
1. Visit TechSoup.org nonprofit portal
2. Verify 501(c)(3) status with IRS letter
3. Apply for AWS credits program
4. Pay $175 administrative fee
5. Receive AWS credit codes (typically 2-4 weeks)
6. Apply credits to AWS account
7. Proceed to Phase 3C (AWS migration)

**Timeline:** 2-4 weeks after IRS approval

---

### 3C. AWS CloudFront + S3 Migration
**Purpose:** Long-term scalable image delivery
**Priority:** 🟢 RECOMMENDED - After TechSoup credits acquired
**Cost:** $0-13/month (AWS free tier covers 1TB CloudFront, 5GB S3)
**After Free Tier:** Use TechSoup credits ($2000)
**Prerequisites:**
- IRS reinstatement approved ✓
- TechSoup credits acquired ✓
- AWS free tier available (8 months remaining) ✓

**Implementation:**
- Guide: `docs/AWS-MIGRATION-GUIDE.md` (to be created)
- Build-time image processing scripts
- S3 bucket setup with CloudFront distribution
- Migration from Cloudinary → S3

**Architecture Change:**
```
Current: User → CloudFlare → Cloudinary (dynamic transformations)
Future:  User → CloudFlare → CloudFront → S3 (pre-processed images)
```

**Benefits:**
- Eliminate Cloudinary dependency
- Pre-processed images (faster delivery)
- $2000 credits cover 2+ years of bandwidth
- Full control over image pipeline

**Timeline:** 4-8 hours migration work after credits acquired

**Trigger:** Implement when IRS approved AND one of:
- Monthly Cloudinary cost >$10 (3 consecutive months)
- Monthly traffic >50k visitors sustained
- Desire to consolidate infrastructure

---

## Emergency Procedures

### If Bandwidth Exceeds 20GB During Month

**Yellow Alert (20-25GB):**
1. ✅ Check CloudFlare cache hit rate (should be >85%)
2. ✅ Review traffic sources (expected or bot traffic?)
3. ✅ Reduce PhotoSwipe zoom size (3840w → 2560w) if implemented
4. ✅ Monitor daily

**Red Alert (25-50GB - Overage charges):**
1. ✅ Calculate overage cost: (usage - 25GB) × $0.10/GB
2. ✅ If cost <$5: Monitor and accept minor overage
3. ✅ If cost >$5: Implement emergency failover (disable zoom)
4. ✅ Accelerate AWS migration planning

**Critical Alert (>50GB):**
1. ✅ Disable PhotoSwipe zoom feature immediately
2. ✅ Reduce image quality (q_90 → q_80 in Cloudinary URLs)
3. ✅ Implement temporary holding page if >100GB
4. ✅ Emergency AWS migration within 48 hours

**Emergency Contact:** See `CLOUDINARY-COST-RISK-MANAGEMENT.md` Phase 4

---

## Success Metrics

### Week 1 (CloudFlare Active)
- [ ] CloudFlare cache hit rate >85%
- [ ] Cloudinary bandwidth reduced by 70-90%
- [ ] No performance degradation
- [ ] Alert system functioning

### Month 1 (PhotoSwipe Active - Optional)
- [ ] Zoom feature working on all devices
- [ ] Bandwidth remains under 25GB free tier
- [ ] No user-reported issues
- [ ] Curator/museum positive feedback on zoom

### Month 3-6 (IRS Timeline)
- [ ] IRS reinstatement status monitored
- [ ] TechSoup application ready (if approved)
- [ ] AWS migration plan refined
- [ ] Bandwidth trends documented

### Year 1 (AWS Migration Complete - Optional)
- [ ] All images migrated to S3
- [ ] CloudFront distribution active
- [ ] TechSoup credits applied
- [ ] Zero ongoing image delivery costs

---

## Key Documents Reference

**Immediate Implementation:**
- `CLOUDINARY-ALERT-SETUP.md` - 5-minute alert setup
- `CLOUDFLARE-SETUP-GUIDE.md` - 30-45 minute CDN setup
- `CLOUDINARY-COST-RISK-MANAGEMENT.md` - Comprehensive risk management

**PhotoSwipe Implementation:**
- `src/components/ZoomableCloudinaryImage.astro` - Zoom component
- `src/scripts/photoswipe-init.ts` - PhotoSwipe configuration
- `PHOTOSWIPE-INSTALLATION.md` - PhotoSwipe setup guide

**Business Context:**
- `~/.claude/agent-state/masumi-hayashi-business-state.json` - Subagent state with cost risk ownership
- `docs/masumi/` - Foundation documentation

**Future Migration:**
- `docs/AWS-MIGRATION-GUIDE.md` (to be created after IRS approval)

---

## Decision Framework

**When to implement each phase:**

| Phase | Implement When | Don't Implement If |
|-------|---------------|-------------------|
| **CloudFlare** | Immediately (before exhibition) | Never skip - free protection |
| **PhotoSwipe** | After CloudFlare active | Bandwidth concerns without CloudFlare |
| **AWS Migration** | IRS approved + credits acquired | Still under free tiers with CloudFlare |

**Cost vs Benefit:**
- CloudFlare: $0 cost, 90% bandwidth protection → **NO-BRAINER**
- PhotoSwipe: $0 cost, professional UX → **HIGH VALUE**
- AWS: $0-175 cost, long-term stability → **WAIT FOR CREDITS**

---

## Timeline Summary

**This Week:**
- ✅ Cloudinary alerts (5 min)
- ✅ CloudFlare setup (45 min)

**Next Week (optional):**
- ✅ PhotoSwipe implementation (2 hours)
- ✅ 7-day bandwidth monitoring

**3-6 Months (waiting on IRS):**
- ⏳ IRS reinstatement
- ⏳ TechSoup credits application
- ⏳ AWS migration (if warranted)

**Total immediate time investment:** 1 hour
**Total immediate cost:** $0
**Protection value:** Prevents $50-500+ surprise bills

---

## Next Steps for User

### Today (5 minutes):
1. Open `CLOUDINARY-ALERT-SETUP.md`
2. Follow Step 1-5 (Cloudinary console alert setup)
3. Set weekly calendar reminder to check usage

### This Week (45 minutes):
1. Open `CLOUDFLARE-SETUP-GUIDE.md`
2. Create CloudFlare account (free)
3. Follow DNS setup steps
4. Wait 2-4 hours for propagation
5. Verify cache hit rate in CloudFlare dashboard

### Before SFMOMA/Canton Announcements:
1. Verify CloudFlare cache hit rate >85%
2. Document baseline Cloudinary usage
3. Confirm weekly monitoring routine in place
4. Consider PhotoSwipe implementation (optional)

### Ongoing:
1. Weekly Cloudinary bandwidth check (30 seconds)
2. Monitor IRS reinstatement status (delegated to worker)
3. Review cost trends monthly
4. Plan AWS migration after IRS approval

---

**Questions or Issues:** Refer to `CLOUDINARY-COST-RISK-MANAGEMENT.md` for troubleshooting and emergency procedures.
