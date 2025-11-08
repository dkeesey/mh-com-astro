# Netlify DNS Migration Guide
## masumihayashi.com → Netlify DNS

### Current DNS Records to Migrate

```json
{
  "a_records": [
    { "name": "@", "value": "75.2.60.5" },
    { "name": "@", "value": "99.83.231.61" }
  ],
  "cname_records": [
    { "name": "www", "value": "masumihayashi.com" },
    { "name": "gallery", "value": "gallery-masumihayashi-com.netlify.app" }
  ],
  "mx_records": [
    { "priority": 0, "value": "mx1.mailchannels.net" },
    { "priority": 0, "value": "mx2.mailchannels.net" }
  ],
  "txt_records": [
    { "name": "@", "value": "google-site-verification=TKTPh2pFOx9Uxu8G89NZhy16ZCTxx2s-N7rYMOn-bVs" },
    { "name": "@", "value": "v=spf1 mx include:netblocks.dreamhost.com include:relay.mailchannels.net -all" }
  ]
}
```

---

## Step 1: Enable Netlify DNS

1. Go to: https://app.netlify.com/sites/gallery-masumihayashi-com/settings/domain
2. Find `masumihayashi.com` in the domain list
3. Click "Options" dropdown → "Use Netlify DNS"
4. **Copy the 4 nameservers** (will be like `dns1.p01.nsone.net`)

---

## Step 2: Configure DNS Records in Netlify

Netlify will auto-create:
- ✓ A record @ → Netlify load balancer
- ✓ CNAME www → masumihayashi.com

**You need to manually ADD:**

1. **CNAME Record**:
   - Name: `gallery`
   - Value: `gallery-masumihayashi-com.netlify.app`

2. **MX Records** (for email forwarding):
   - Name: `@`, Value: `mx1.mailchannels.net`, Priority: `0`
   - Name: `@`, Value: `mx2.mailchannels.net`, Priority: `0`

3. **TXT Records**:
   - Name: `@`, Value: `google-site-verification=TKTPh2pFOx9Uxu8G89NZhy16ZCTxx2s-N7rYMOn-bVs`
   - Name: `@`, Value: `v=spf1 mx include:netblocks.dreamhost.com include:relay.mailchannels.net -all`

---

## Step 3: Update Nameservers in DreamHost

1. Go to: https://panel.dreamhost.com
2. Navigate to: **Domains → Registrations**
3. Find `masumihayashi.com`
4. Click **Nameservers** or **DNS**
5. Change from DreamHost nameservers to **Netlify's 4 nameservers**
6. **Save changes**

---

## Step 4: Wait & Monitor

**DNS Propagation**: 5-30 minutes
**SSL Provisioning**: Automatic, 5-10 minutes after DNS propagates

### Monitor Progress:
```bash
./check-deployment-status.sh
```

Or manually check:
```bash
dig masumihayashi.com NS +short  # Should show Netlify nameservers
dig masumihayashi.com +short     # Should show Netlify IPs
curl -I https://masumihayashi.com/  # Should get HTTP/2 200 with SSL
```

---

## Success Criteria

- [ ] `masumihayashi.com` resolves with SSL
- [ ] `gallery.masumihayashi.com` resolves with SSL
- [ ] `www.masumihayashi.com` redirects to apex
- [ ] Legacy redirects work (test with `node test-redirects-comprehensive.js`)
- [ ] Email forwarding still works (MX records migrated)

---

## Rollback Plan

If anything goes wrong, revert nameservers in DreamHost back to:
- `ns1.dreamhost.com`
- `ns2.dreamhost.com`
- `ns3.dreamhost.com`

DNS will revert within 5-30 minutes.
