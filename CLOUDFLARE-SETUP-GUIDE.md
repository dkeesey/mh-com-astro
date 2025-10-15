# CloudFlare Setup Guide - Bandwidth Protection for masumihayashi.com

## Purpose
Implement free CloudFlare CDN to cache images and reduce Cloudinary bandwidth by 70-90%, preventing surprise bills during traffic spikes.

**Time Required:** 30-45 minutes
**Cost:** $0 (free plan forever)
**Benefit:** Stay under Cloudinary 25GB free tier even with viral traffic

---

## Prerequisites

- Domain: masumihayashi.com
- Current hosting: Netlify/Vercel (Astro site)
- Images: Cloudinary CDN
- Access to domain registrar (DreamHost)

---

## Step 1: Sign Up for CloudFlare (5 minutes)

1. **Go to CloudFlare:** https://dash.cloudflare.com/sign-up
2. **Create account:**
   - Email: dean@masumihayashifoundation.org (or your preferred email)
   - Password: Use strong password
   - **No credit card required** for free plan
3. **Verify email**

---

## Step 2: Add Your Domain (5 minutes)

1. **Click "Add a Site"**
2. **Enter domain:** `masumihayashi.com`
3. **Select Free Plan** ($0/month)
4. **Quick Scan:** CloudFlare will scan existing DNS records (takes 30-60 seconds)

---

## Step 3: Review DNS Records (5 minutes)

CloudFlare imports your existing DNS records automatically:

**Verify these records exist:**
- A record: `@` → Your Netlify/Vercel IP
- CNAME: `www` → Your site
- Any other subdomains (e.g., `gallery.masumihayashi.com`)

**Important:**
- ✅ Click the **orange cloud icon** for web traffic (enables caching)
- ⚠️ Only enable orange cloud for HTTP/HTTPS traffic
- 🔘 Keep email/FTP records gray (DNS only)

**What the orange cloud does:**
- Routes traffic through CloudFlare's CDN
- Caches images, CSS, JavaScript
- Provides DDoS protection

---

## Step 4: Update Nameservers at Domain Registrar (10-15 minutes)

CloudFlare will provide 2 nameservers (example):
```
alina.ns.cloudflare.com
raul.ns.cloudflare.com
```

### For DreamHost (your current registrar):

1. **Login to DreamHost Panel:** https://panel.dreamhost.com/
2. **Navigate to:** Domains → Registrations
3. **Find:** masumihayashi.com
4. **Click:** DNS or Nameservers
5. **Select:** "Use custom nameservers"
6. **Enter CloudFlare nameservers:**
   - Nameserver 1: (from CloudFlare dashboard)
   - Nameserver 2: (from CloudFlare dashboard)
7. **Save changes**

**DNS Propagation:**
- Takes 2-48 hours (usually 2-4 hours)
- Your site stays online during propagation
- No downtime

---

## Step 5: Configure CloudFlare Caching Rules (5-10 minutes)

While waiting for DNS propagation, configure CloudFlare:

### 5a. Enable Always Online

1. **CloudFlare Dashboard** → Select your domain
2. **Caching** → **Configuration**
3. **Always Online:** Toggle **ON**
   - Serves cached version if origin is down
   - Useful during Netlify deployments

### 5b. Create Page Rules for Image Caching

**Free plan includes 3 page rules - use them wisely:**

**Rule 1: Cache Cloudinary Images**
1. **Rules** → **Page Rules** → **Create Page Rule**
2. **URL Pattern:** `*res.cloudinary.com/masumi-hayashi-foundation/*`
3. **Settings:**
   - **Cache Level:** Cache Everything
   - **Edge Cache TTL:** 1 year
   - **Browser Cache TTL:** 1 year
4. **Save and Deploy**

**Rule 2: Cache Site Assets**
1. **Create Page Rule**
2. **URL Pattern:** `masumihayashi.com/*`
3. **Settings:**
   - **Cache Level:** Cache Everything
   - **Edge Cache TTL:** 1 year
4. **Save and Deploy**

**Rule 3: Reserved for future use** (keep one rule available for emergencies)

### 5c. Set Default Cache Settings

1. **Caching** → **Configuration**
2. **Browser Cache TTL:** 4 hours (or longer)
3. **Crawler Hints:** ON
4. **Always Online:** ON

---

## Step 6: Verify DNS Propagation (Check after 2-4 hours)

### Method 1: Check DNS
```bash
# Check if CloudFlare nameservers are active
dig masumihayashi.com NS +short

# Should show CloudFlare nameservers (e.g., alina.ns.cloudflare.com)
```

### Method 2: Check HTTP Headers
```bash
# Check if CloudFlare is serving your site
curl -I https://masumihayashi.com

# Look for header: cf-cache-status: HIT or MISS
# Look for header: server: cloudflare
```

### Method 3: CloudFlare Dashboard
- **Overview** → Should show "Active" status
- **Analytics** → Will start showing traffic data

---

## Step 7: Test Image Caching (After DNS is active)

### Test Cloudinary Image Caching

1. **Visit your site:** https://masumihayashi.com
2. **Open browser DevTools:** F12 → Network tab
3. **Reload page**
4. **Find a Cloudinary image request**
5. **Check response headers:**
   ```
   cf-cache-status: MISS   (first request)
   cf-cache-status: HIT    (second request - cached!)
   ```

**What you want to see:**
- First request: `cf-cache-status: MISS` (CloudFlare fetches from Cloudinary)
- Second request: `cf-cache-status: HIT` (CloudFlare serves from cache)

**Cache hit means:** Image is served from CloudFlare, NOT counting toward Cloudinary bandwidth!

---

## Step 8: Monitor Performance (Next 7 days)

### CloudFlare Analytics Dashboard

**Track these metrics:**
1. **Requests** → Total traffic
2. **Bandwidth** → Data served
3. **Cache ratio** → Percentage of requests served from cache
   - **Target:** >85% cache hit rate
   - **Good:** 70-85%
   - **Poor:** <70% (review Page Rules)

### Cloudinary Usage (Compare to previous weeks)

1. **Login to Cloudinary:** https://cloudinary.com/console
2. **Usage** → **Bandwidth**
3. **Compare:**
   - Week before CloudFlare: X GB
   - Week after CloudFlare: Should be 70-90% lower

---

## Troubleshooting

### DNS Not Propagating After 24 Hours

**Check:**
1. Nameservers correctly entered at registrar?
2. Use DNS checker: https://www.whatsmydns.net/
3. Contact DreamHost support if stuck

### Cache Not Working (cf-cache-status: BYPASS)

**Possible causes:**
1. Page Rule not configured correctly
2. URL pattern doesn't match
3. Orange cloud not enabled for domain

**Fix:**
- Review Page Rules (must match exact URL pattern)
- Ensure orange cloud is ON for A/CNAME records
- Clear CloudFlare cache: **Caching** → **Purge Everything**

### Site Down After DNS Switch

**Don't panic - DNS propagation in progress:**
1. Wait 2-4 more hours
2. Clear browser cache
3. Try different browser or incognito mode
4. Check CloudFlare status: https://www.cloudflarestatus.com/

### Images Not Loading

**Check:**
1. Cloudinary URLs still work directly: `https://res.cloudinary.com/masumi-hayashi-foundation/...`
2. CORS headers (CloudFlare should pass through)
3. SSL/HTTPS settings in CloudFlare (should be "Full")

---

## Expected Results

### Immediately After Setup
- Site loads normally (no visible changes)
- CloudFlare headers appear in HTTP responses
- Analytics start tracking in CloudFlare dashboard

### After 24 Hours
- Cache hit rate: 70-85%
- Cloudinary bandwidth: 70-90% reduction
- Page load times: 10-30% faster (due to CloudFlare's global CDN)

### After 1 Week
- Cloudinary usage: Dramatically lower
- CloudFlare analytics: Clear traffic patterns
- Cache efficiency: >85% hit rate

---

## Bandwidth Savings Calculator

**Before CloudFlare:**
- 10,000 artwork views = 15GB Cloudinary bandwidth
- Status: Approaching 25GB free tier limit

**After CloudFlare (90% cache hit rate):**
- 10,000 artwork views = 1.5GB Cloudinary bandwidth (90% served by CloudFlare)
- CloudFlare bandwidth: Unlimited free
- Status: Well under 25GB limit

**With zoom feature enabled:**
- Before: 100 zoom interactions = 800MB extra
- After: 100 zoom interactions = 80MB extra (90% cached)

---

## Security & Performance Features (Bonus)

CloudFlare free plan includes:

### Security
- ✅ DDoS protection (unlimited)
- ✅ SSL/TLS encryption (automatic)
- ✅ Firewall rules (basic)
- ✅ Bot protection

### Performance
- ✅ Global CDN (200+ locations)
- ✅ HTTP/2 and HTTP/3
- ✅ Brotli compression
- ✅ Image optimization (limited on free)

### Reliability
- ✅ Always Online (serves cached pages if origin down)
- ✅ 100% uptime SLA (even on free)

---

## Next Steps After CloudFlare is Active

1. ✅ **Monitor for 1 week** - Verify cache hit rates >85%
2. ✅ **Implement Cloudinary alerts** - Set alerts at 20GB
3. ✅ **Implement PhotoSwipe zoom** - Test bandwidth impact with CloudFlare protection
4. ⏳ **Wait for IRS 501(c)(3) reinstatement** - Then apply for TechSoup AWS credits
5. ⏳ **Migrate to AWS** - When nonprofit status restored (use TechSoup credits)

---

## Support Resources

**CloudFlare:**
- Dashboard: https://dash.cloudflare.com
- Docs: https://developers.cloudflare.com
- Community: https://community.cloudflare.com
- Status: https://www.cloudflarestatus.com

**DNS Propagation Check:**
- Global DNS checker: https://www.whatsmydns.net/

**This Guide:**
- Location: `/Users/deankeesey/Workspace/dk-sites/mh-com-astro/CLOUDFLARE-SETUP-GUIDE.md`
- Related: `CLOUDINARY-COST-RISK-MANAGEMENT.md`

---

## Summary

✅ **Setup Time:** 30-45 minutes
✅ **Cost:** $0/month forever
✅ **Bandwidth Savings:** 70-90% reduction
✅ **Protection:** Unlimited bandwidth via CloudFlare
✅ **Risk:** Eliminated surprise bandwidth bills

**You're now protected from viral traffic while awaiting IRS nonprofit reinstatement and TechSoup AWS credits.**
