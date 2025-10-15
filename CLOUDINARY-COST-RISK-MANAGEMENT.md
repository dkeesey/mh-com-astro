# Cloudinary Cost Risk Management & Mitigation Strategy

## CRITICAL: Read This Before Traffic Spikes

**Document Purpose:** Protect against surprise billing from successful traffic growth while maintaining high-quality image delivery for artwork viewing and zoom functionality.

**Last Updated:** 2025-10-15
**Owner:** Dean Keesey
**Status:** Active Risk Management

---

## Executive Summary

**The Distribution Angle:** High-quality zoomable artwork images are a competitive advantage for reaching curators, museums, and collectors. This drives traffic.

**The Risk:** Cloudinary free tier (25GB/month) can be exceeded during viral traffic or exhibition announcements, causing surprise bills ($50-500+ depending on traffic).

**The Strategy:** Implement monitoring, alerts, and failover options BEFORE traffic spikes occur.

---

## Current Architecture (As of Oct 2025)

### Image Delivery Stack
```
User Browser
    ↓
Cloudinary CDN (dynamic transformations)
    ↓ (text overlays, resizing, format optimization)
Cloudinary Storage (masumi-hayashi-foundation account)
```

### Image Sizes Served
- **Responsive images:** 640w, 768w, 1024w, 1280w, 1536w, 1920w (1-3MB each)
- **Zoom images (if implemented):** 2560w or 3840w (4-12MB each)
- **Text overlays:** Title, location, artist, copyright (dynamic per viewport)

### Current Free Tier Limits
- **Bandwidth:** 25GB/month (free)
- **Transformations:** 25 credits/month (ample for our use)
- **Storage:** 25GB (ample)
- **Overage pricing:** ~$0.10/GB beyond free tier

**Dashboard:** https://cloudinary.com/console/usage

---

## Traffic Scenarios & Cost Projection

### Baseline (Current - Oct 2025)
- **Monthly visitors:** ~100-500
- **Artworks per visitor:** 5-10
- **Average image size:** 1.5MB
- **Monthly bandwidth:** 1-5GB
- **Cost:** $0 (well under free tier)
- **Risk Level:** 🟢 LOW

### Moderate Growth (Exhibition Launch)
- **Monthly visitors:** 2,000-5,000
- **Artworks per visitor:** 10
- **With zoom:** 20% click zoom (8MB avg)
- **Monthly bandwidth:** 30-50GB
- **Cost:** $5-25/month (exceeds free tier)
- **Risk Level:** 🟡 MEDIUM

### Viral Success (Press Coverage, Social Media)
- **Monthly visitors:** 20,000-50,000
- **Artworks per visitor:** 8
- **With zoom:** 15% click zoom
- **Monthly bandwidth:** 300-600GB
- **Cost:** $30-60/month
- **Risk Level:** 🟠 HIGH (but manageable if prepared)

### Worst Case (Sustained Viral + Bot Traffic)
- **Monthly visitors:** 100,000+
- **Bandwidth:** 1-2TB
- **Cost:** $100-200/month
- **Risk Level:** 🔴 CRITICAL (requires immediate action)

---

## Risk Triggers & Alert Thresholds

### Monitoring Points

| Metric | Green | Yellow | Red | Critical |
|--------|-------|--------|-----|----------|
| **Monthly Bandwidth** | <15GB | 15-25GB | 25-100GB | >100GB |
| **Daily Bandwidth** | <500MB | 500MB-1GB | 1-5GB | >5GB |
| **Cost Projection** | $0 | $0-5 | $5-50 | >$50 |
| **Action Required** | Monitor | Review | Implement failover | Emergency cutover |

### Alert Setup (DO THIS NOW)

**Cloudinary Console:**
1. Login: https://cloudinary.com/console
2. Settings → Notifications
3. Set email alerts:
   - ⚠️ **20GB/month** (warning - 5GB buffer before limit)
   - 🚨 **24GB/month** (critical - 1GB before limit)
   - 🔔 **Daily spike: >1GB/day** (unusual traffic)

**Email recipients:**
- deankeesey@[email] (primary)
- [backup email if available]

**Dashboard bookmark:** https://cloudinary.com/console/usage

---

## Protection Strategies (Implement in Order)

### Phase 1: Immediate (Zero Cost)

#### 1A. Enable Cloudinary Usage Alerts
**Status:** 📋 READY TO IMPLEMENT
**Time:** 5 minutes
**Cost:** $0
**Guide:** See `CLOUDINARY-ALERT-SETUP.md` for step-by-step instructions

```bash
# Action: Manual setup in Cloudinary console
# Settings → Notifications → Enable bandwidth alerts at 20GB
# Weekly monitoring via dashboard: https://cloudinary.com/console/usage
```

#### 1B. Cap Zoom Image Sizes
**Status:** ⚠️ NOT YET IMPLEMENTED (zoom feature pending)
**Time:** 2 minutes (code change)
**Cost:** $0
**Bandwidth savings:** 50%

**File:** `src/components/ZoomableCloudinaryImage.astro`

```astro
// Use 2560w max instead of 3840w
// Change line ~130:
<a
  href={imageURL2560}           // NOT imageURL3840
  data-pswp-width="2560"         // NOT 3840
  data-pswp-height="1707"        // Adjust for aspect ratio
```

**Rationale:** 2560w still provides excellent detail viewing (4K resolution), but uses 50% less bandwidth than 3840w.

#### 1C. Document Current Usage Baseline
**Status:** ⚠️ NEEDS COMPLETION
**Time:** 2 minutes
**Cost:** $0

```bash
# Check current usage:
# 1. Login to Cloudinary console
# 2. Note current month's bandwidth usage
# 3. Record in this document below:

# BASELINE USAGE (Update monthly):
# Date: _______________
# Monthly bandwidth: _____ GB
# Average daily: _____ MB
# Cost: $_____
```

---

### Phase 2: CloudFlare CDN (Free Protection Layer)

**Status:** 📋 READY TO IMPLEMENT
**Implementation time:** 30-45 minutes
**Cost:** $0 (free plan, forever)
**Bandwidth savings:** 70-90% (via edge caching)
**Priority:** 🔥 HIGH - Implement before major exhibition launch
**Guide:** See `CLOUDFLARE-SETUP-GUIDE.md` for step-by-step instructions

#### How CloudFlare Protection Works

```
Before:
User → Cloudinary (every request hits origin, counts toward 25GB)

After:
User → CloudFlare Edge Cache (free, unlimited) → Cloudinary (only on cache miss)

Result: 90% of requests served from CloudFlare cache (free)
        10% hit Cloudinary origin (counts toward 25GB)
```

#### Setup Steps

**File:** `docs/CLOUDFLARE-SETUP.md` (to be created when implementing)

1. **Sign up for CloudFlare**
   - URL: https://dash.cloudflare.com/sign-up
   - Select FREE plan

2. **Add domain: masumihayashi.com**
   - CloudFlare → Add Site
   - CloudFlare provides nameservers

3. **Update DNS at domain registrar**
   - Point to CloudFlare nameservers
   - Wait for propagation (2-48 hours)

4. **Configure Page Rules (free plan: 3 rules)**
   ```
   Rule 1: masumihayashi.com/artwork/*
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 year

   Rule 2: res.cloudinary.com/masumi-hayashi-foundation/*
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 year

   Rule 3: *.jpg, *.png, *.webp
   - Browser Cache TTL: 1 year
   ```

5. **Test caching**
   ```bash
   # First request (cache miss):
   curl -I https://masumihayashi.com/artwork/some-image.jpg
   # Look for: cf-cache-status: MISS

   # Second request (cache hit):
   curl -I https://masumihayashi.com/artwork/some-image.jpg
   # Look for: cf-cache-status: HIT
   ```

#### Expected Results
- **Cache hit rate:** 85-95% after 24 hours
- **Cloudinary bandwidth reduction:** 70-90%
- **Example:** 100GB traffic → only 10GB hits Cloudinary
- **Cost savings:** Prevents overage charges during traffic spikes

---

### Phase 3: AWS CloudFront + S3 (Ultimate Scalability)

**Status:** ⏳ DEFERRED - Waiting for IRS 501(c)(3) reinstatement
**Implementation time:** 4-8 hours
**Cost:** ~$0-13/month (AWS free tier: 1TB CloudFront, 5GB S3 - 8 months remaining)
**After Free Tier:** TechSoup AWS credits ($2000 value for $175 - nonprofits only)
**Trigger:** IRS reinstatement approved (3-6 month timeline)
**Priority:** 🟢 **HIGH - RECOMMENDED** based on content stability
**Business Case:** Artwork metadata changes infrequently (only format re-evaluation or corrections), making pre-processed approach ideal. Rebuild overhead is acceptable for rare updates.
**IRS Context:** Foundation applied Oct 2025 for reinstatement (3 missing 990-N forms). TechSoup credits require active 501(c)(3) status. Strategy: Use CloudFlare + Cloudinary free tier while awaiting approval.

#### When to Implement

Implement AWS migration when:
- ✅ **IRS 501(c)(3) reinstatement approved** (unlocks TechSoup credits)
- ✅ TechSoup credits acquired ($2000 AWS for $175)
- AND one or more of:
  - Monthly Cloudinary cost >$10 (3 consecutive months)
  - Monthly traffic >50,000 visitors sustained
  - CloudFlare protection insufficient (still exceeding free tier)
  - Desire to consolidate infrastructure (Cloudinary → AWS)

#### Architecture Change

**Current (Dynamic Cloudinary):**
```
Build → Deploy static HTML
Runtime → User requests image → Cloudinary generates on-the-fly → CDN cache
```

**Future (Pre-processed AWS):**
```
Build → Generate all image variants → Upload to S3
Runtime → User requests image → CloudFront serves static file (no API calls)
```

#### Cost Comparison (50k visitors/month scenario)

| Service | Cloudinary (Current) | AWS (Future) | Savings |
|---------|---------------------|--------------|---------|
| Storage | Included ($0) | $0.06/month | -$0.06 |
| Bandwidth | ~$15/month | $0-13/month* | $2-15 |
| Transformations | Included | One-time (build) | N/A |
| **Total** | **$15/month** | **$0.06-13/month** | **15-99%** |

*First 1TB free for 12 months on AWS free tier

#### Implementation Files

**Files to create when implementing:**
- `scripts/build-zoom-images.js` - Generate variants at build time
- `scripts/upload-to-s3.js` - Upload to S3 bucket
- `docs/AWS-MIGRATION-GUIDE.md` - Step-by-step AWS setup
- Update `astro.config.mjs` - Environment-based URL switching

**Reference migration plan:** See `ZOOM-IMPLEMENTATION-PLAN.md` section "AWS CloudFront (Future)"

---

### Phase 4: Emergency Failover (Break Glass)

**Status:** 📋 DOCUMENTED (ready to execute)
**Implementation time:** 15 minutes
**Cost:** $0
**Trigger:** Unexpected viral traffic causing >$50/day in charges

#### Emergency Actions (In Order)

##### 1. Immediate: Disable Zoom Feature
**Impact:** Reduces bandwidth by 40-60%
**User experience:** Artwork still viewable, just no zoom

**File:** `src/layouts/Layout.astro`

```astro
<!-- Comment out PhotoSwipe initialization -->
<!--
<script>
  import '../scripts/photoswipe-init.ts';
</script>
-->
```

**Deployment:**
```bash
# Emergency deploy without zoom
git commit -m "Emergency: Disable zoom to reduce bandwidth"
git push
# Trigger Netlify/Vercel deployment
```

##### 2. Reduce Image Quality
**Impact:** 30-50% bandwidth reduction
**User experience:** Slightly lower quality (still acceptable)

**File:** `src/components/CloudinaryImage.astro` or `ZoomableCloudinaryImage.astro`

```astro
// Add quality parameter to transformations
const transformations = [
  "bo_30px_solid_black",
  "b_black",
  "c_scale",
  "q_80"  // Add quality: 80% (default is 90%)
];
```

##### 3. Serve Smaller Max Size
**Impact:** 40-60% bandwidth reduction
**User experience:** Lower max resolution

```astro
// Change max srcset size from 1920w to 1280w
const srcsetValue = `
  ${imageURL640} 640w,
  ${imageURL768} 768w,
  ${imageURL1024} 1024w,
  ${imageURL1280} 1280w
`;
// Remove 1536w and 1920w from srcset
```

##### 4. Enable CloudFlare (if not already done)
**Impact:** 70-90% bandwidth reduction within 24 hours
**User experience:** No change (transparent caching)

Follow Phase 2 setup above.

##### 5. Temporary Holding Page
**Impact:** 99% bandwidth reduction (nuclear option)
**User experience:** Site unavailable (apologize to users)

```bash
# Create emergency holding page
echo "Site temporarily unavailable due to high traffic.
      Check back in 24 hours." > public/index.html

# Deploy
git add public/index.html
git commit -m "Emergency: Enable holding page"
git push
```

---

## Monitoring Dashboard Setup

### Daily Monitoring Routine (2 minutes)

**Bookmark:** https://cloudinary.com/console/usage

**Check daily if traffic is elevated:**
1. Current month bandwidth usage
2. Compare to previous day (look for spikes)
3. Calculate daily rate: `(current usage / days elapsed) × 30`
4. If projected >25GB, review failover options

### Weekly Review (5 minutes)

**Every Monday:**
1. Check Cloudinary usage trends
2. Review any alert emails
3. Check site analytics for traffic spikes
4. Verify CloudFlare cache hit rate (if implemented)
5. Update baseline usage in this document

### Monthly Actions

**First of each month:**
1. Archive previous month's bandwidth data
2. Calculate actual costs (if any)
3. Review cost vs traffic trends
4. Decide if AWS migration is warranted
5. Update risk assessment in this document

---

## Decision Tree: When Traffic Spikes

```
Traffic spike detected (>1GB/day)
    ↓
Is it expected? (exhibition launch, press coverage)
    ↓ NO
    Check for bot traffic → Block bad actors (CloudFlare)
    ↓ YES
    Current bandwidth usage?
        ↓
    <20GB → Monitor closely, no action needed
        ↓
    20-25GB → Yellow alert
        ↓ Action: Enable CloudFlare (Phase 2) if not already
        ↓
    25-50GB → Red alert
        ↓ Action: Reduce zoom size (2560w→1920w), enable quality compression
        ↓
    >50GB → Critical alert
        ↓ Action: Disable zoom, implement emergency failover (Phase 4)
        ↓
    >100GB → Emergency
        ↓ Action: Enable holding page, immediate AWS migration planning
```

---

## Contact Information

### Service Providers

**Cloudinary Support**
- Dashboard: https://cloudinary.com/console
- Support: https://support.cloudinary.com
- Account: masumi-hayashi-foundation
- Emergency contact: support@cloudinary.com

**CloudFlare Support (when implemented)**
- Dashboard: https://dash.cloudflare.com
- Docs: https://developers.cloudflare.com
- Community: https://community.cloudflare.com

**AWS Support (future)**
- Console: https://console.aws.amazon.com
- Support: https://console.aws.amazon.com/support

### Emergency Contacts

**Technical owner:** Dean Keesey
**Hosting provider:** [Netlify/Vercel/etc]
**Domain registrar:** [registrar name]

---

## Success Stories (When This Works Well)

Document positive outcomes here:

### Example Template:
```
Date: ___________
Event: SFMOMA exhibition announcement
Traffic: 15,000 visitors in 3 days
Bandwidth: 45GB
Protection used: CloudFlare CDN
Cloudinary usage: 8GB (via cache)
Cost: $0 (stayed under free tier)
Lesson: CloudFlare protection worked perfectly
```

---

## Incident Log (When Things Go Wrong)

Document issues and resolutions here:

### Example Template:
```
Date: ___________
Incident: Unexpected traffic spike
Root cause: Reddit post went viral
Traffic: 50,000 visitors in 24 hours
Bandwidth: 120GB
Action taken: Emergency Phase 4 - disabled zoom
Cost impact: $9.50 overage charge
Resolution: Implemented CloudFlare, re-enabled zoom after 48 hours
Lesson: Need earlier CloudFlare implementation
```

---

## Quarterly Review Checklist

**Every 3 months, review:**

- [ ] Total bandwidth usage trends (increasing?)
- [ ] Any surprise charges? (document in incident log)
- [ ] CloudFlare cache hit rate (if implemented)
- [ ] Is AWS migration warranted? (traffic >50k/month sustained?)
- [ ] Are alert thresholds still appropriate?
- [ ] Update this document with new learnings
- [ ] Test emergency failover procedures (dry run)

---

## Key Takeaways for Future Claude Sessions

**If you're reading this during a traffic spike:**

1. **Check Cloudinary usage NOW:** https://cloudinary.com/console/usage
2. **Current month >20GB?** → Implement CloudFlare (Phase 2) immediately
3. **Current month >40GB?** → Emergency failover (Phase 4) while implementing CloudFlare
4. **Sustained high traffic?** → Plan AWS migration (Phase 3)

**If you're implementing new features:**

1. Always consider bandwidth impact of new image features
2. Test with bandwidth monitoring enabled
3. Calculate worst-case traffic scenarios before launch
4. Document new features in this risk management doc

**If you're planning an exhibition launch:**

1. Implement CloudFlare protection 2 weeks before launch
2. Set up enhanced monitoring (daily checks)
3. Brief client on emergency procedures
4. Have Phase 4 failover ready to execute

---

## Version History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-10-15 | 1.0 | Initial risk management document | Claude Code |
| | | | |

---

## Related Documentation

- `ZOOM-IMPLEMENTATION-PLAN.md` - Technical zoom feature details
- `PHOTOSWIPE-INSTALLATION.md` - PhotoSwipe setup guide
- `CLOUDINARY-COST-RISK-MANAGEMENT.md` - This document
- `docs/CLOUDFLARE-SETUP.md` - (To be created in Phase 2)
- `docs/AWS-MIGRATION-GUIDE.md` - (To be created in Phase 3)

---

**REMEMBER:** Success in this context means getting traffic. The tools in this document ensure that success doesn't come with surprise bills. The cost of protection ($0 with CloudFlare) is worth the peace of mind.
