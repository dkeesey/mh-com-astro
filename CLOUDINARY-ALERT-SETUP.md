# Cloudinary Usage Alert Setup - 5 Minute Protection

## Purpose
Set up automatic email alerts when approaching Cloudinary's 25GB free tier limit to prevent surprise bandwidth charges.

**Time Required:** 5 minutes
**Cost:** $0
**Protection:** Get warned at 20GB (before hitting 25GB limit)

---

## Step 1: Login to Cloudinary Console

1. **Go to:** https://cloudinary.com/console
2. **Login with:** masumi-hayashi-foundation account
3. **Navigate to:** Settings (gear icon in top right)

---

## Step 2: Enable Usage Notifications

### Option A: Email Notifications (If Available)

1. **Settings** → **Account** → **Notifications**
2. **Look for:** "Usage notifications" or "Bandwidth alerts"
3. **Enable notifications for:**
   - Monthly bandwidth usage
   - Approaching plan limits
4. **Email:** dean@masumihayashifoundation.org
5. **Threshold:** Set alert at 80% (20GB of 25GB)
6. **Save changes**

### Option B: Manual Monitoring (If No Built-in Alerts)

**Cloudinary free tier may not have automated alerts.** If you don't see notification settings, use manual monitoring:

**Weekly Check (Every Monday):**
1. **Login:** https://cloudinary.com/console
2. **Check:** Usage → Bandwidth
3. **Record:** Current month's bandwidth
4. **Calculate:** Projected usage = (current usage / days elapsed) × 30
5. **Alert yourself if:** Projected >20GB

**Set calendar reminder:**
```bash
# Add to your calendar/reminders
Title: Check Cloudinary Bandwidth
Frequency: Weekly (every Monday)
URL: https://cloudinary.com/console/usage
Alert: If >15GB, implement CloudFlare immediately
```

---

## Step 3: Set Up Billing Alerts (Backup Protection)

Even if you can't set usage alerts, you can set billing alerts:

1. **Settings** → **Account** → **Billing**
2. **Look for:** "Billing notifications" or "Cost alerts"
3. **Enable:** Email when charges occur
4. **Email:** dean@masumihayashifoundation.org

**Why this helps:**
- You'll get notified if you exceed free tier
- Won't prevent charges but limits surprise factor
- Gives you time to implement CloudFlare emergency protection

---

## Step 4: Document Baseline Usage (Important!)

**Record your current usage to track trends:**

**Today's date:** _____________
**Current month bandwidth:** _______ GB
**Days elapsed:** _______ days
**Daily average:** _______ MB/day
**Projected monthly:** _______ GB

**Update this monthly in:** `CLOUDINARY-COST-RISK-MANAGEMENT.md`

---

## Step 5: Create Manual Alert System

Since Cloudinary free tier may lack automated alerts, create your own:

### Method 1: Calendar Reminders

**Set 3 recurring reminders:**

1. **Weekly Check** (Every Monday, 9 AM)
   - Action: Check Cloudinary usage
   - If >15GB: Implement CloudFlare within 48 hours
   - If >20GB: Emergency - implement CloudFlare today

2. **Mid-Month Check** (15th of month, 9 AM)
   - Action: Check if on track
   - Calculate: (usage to date / 15) × 30 = projected total
   - If projected >20GB: Plan CloudFlare setup

3. **End-of-Month Review** (Last day of month, 5 PM)
   - Action: Document final usage
   - Update baseline in risk management doc
   - Adjust alerts if needed

### Method 2: Bookmark + Weekly Routine

**Create browser bookmark:**
- URL: https://cloudinary.com/console/usage
- Title: ⚠️ CHECK CLOUDINARY BANDWIDTH ⚠️
- Location: Bookmarks bar (always visible)

**Weekly routine:**
- Every Monday morning before email
- Click bookmark → Check usage → Close if <15GB

---

## Alert Thresholds & Actions

| Usage | Status | Action |
|-------|--------|--------|
| 0-15GB | 🟢 Green | Monitor weekly |
| 15-20GB | 🟡 Yellow | Implement CloudFlare within 2 weeks |
| 20-25GB | 🟠 Orange | Implement CloudFlare within 48 hours |
| >25GB | 🔴 Red | EMERGENCY: CloudFlare + reduce zoom sizes |

---

## Emergency Response Plan

**If you exceed 20GB during month:**

### Immediate Actions (Same Day):
1. ✅ **Start CloudFlare setup** - Use `CLOUDFLARE-SETUP-GUIDE.md`
2. ✅ **Check traffic source** - Is spike expected (exhibition announcement)?
3. ✅ **Review zoom usage** - Are users clicking zoom frequently?

### Within 48 Hours:
1. ✅ **Complete CloudFlare setup** - Even if DNS not fully propagated
2. ✅ **Monitor next 24 hours** - Should see immediate cache hit rate >70%

### If Exceeds 25GB (Overage Charges):
1. ✅ **CloudFlare should prevent this** - But if it happens:
2. ✅ **Review CLOUDINARY-COST-RISK-MANAGEMENT.md** - Phase 4 emergency procedures
3. ✅ **Consider:** Temporarily disable zoom feature (reduces bandwidth 40-60%)
4. ✅ **Calculate cost:** Overage = (total GB - 25) × $0.10/GB
   - Example: 30GB = 5GB overage = $0.50 (minimal)
   - Example: 50GB = 25GB overage = $2.50 (acceptable)
   - Example: 100GB = 75GB overage = $7.50 (implement emergency failover)

---

## Verification Checklist

After setup, verify you have:

- [ ] Checked if Cloudinary has built-in usage alerts (enabled if available)
- [ ] Set up billing notification email
- [ ] Documented baseline usage
- [ ] Created weekly calendar reminder
- [ ] Bookmarked Cloudinary usage dashboard
- [ ] Reviewed emergency response plan
- [ ] Know where CloudFlare setup guide is located

---

## Monitoring Dashboard URLs

**Bookmark these:**

1. **Cloudinary Usage:** https://cloudinary.com/console/usage
   - Check: Monthly bandwidth, transformation credits, storage

2. **Cloudinary Billing:** https://cloudinary.com/console/settings/account#billing-tab
   - Check: Current plan, billing alerts, payment method

3. **CloudFlare Analytics:** https://dash.cloudflare.com (after CloudFlare setup)
   - Check: Cache hit rate, bandwidth savings

---

## Integration with Cost Risk Management

**This alert system is Phase 1 of your protection strategy:**

- **Phase 1 (Now):** Cloudinary alerts ← **YOU ARE HERE**
- **Phase 2 (Next):** CloudFlare CDN (when usage >15GB or before exhibition)
- **Phase 3 (After IRS):** TechSoup AWS credits
- **Phase 4 (Emergency):** Failover procedures in `CLOUDINARY-COST-RISK-MANAGEMENT.md`

**All documented in:** `/Users/deankeesey/Workspace/dk-sites/mh-com-astro/CLOUDINARY-COST-RISK-MANAGEMENT.md`

---

## Quick Reference

**Check usage:** https://cloudinary.com/console/usage
**Frequency:** Weekly (every Monday)
**Green zone:** <15GB
**Action zone:** >15GB (implement CloudFlare)
**Emergency:** >20GB (CloudFlare within 48 hours)

**Time to check:** 30 seconds/week
**Protection value:** Prevents $10-100+ surprise bills

---

## Summary

✅ **Setup Time:** 5 minutes
✅ **Cost:** $0
✅ **Frequency:** Weekly 30-second check
✅ **Protection:** Early warning before overage charges
✅ **Action:** Implement CloudFlare when needed

**You're now monitoring Cloudinary usage with early warning system in place.**
