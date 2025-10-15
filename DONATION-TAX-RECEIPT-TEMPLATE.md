# Tax Receipt Email Template - Masumi Hayashi Foundation

## IRS-Compliant 501(c)(3) Tax Receipt

**Send this email after each Stripe donation (manually initially, automate later via Stripe webhooks + CRM)**

---

### Email Subject
```
Tax Receipt - Masumi Hayashi Foundation Donation
```

### Email Body
```
Dear [Donor Name],

Thank you for your generous donation to the Masumi Hayashi Foundation!

DONATION RECEIPT FOR TAX PURPOSES

Donor Information:
Name: [Donor Full Name]
Email: [Donor Email]
Date: [Donation Date - MM/DD/YYYY]

Donation Details:
Amount: $[Donation Amount]
Payment Method: [Credit Card / ACH]
Transaction ID: [Stripe Transaction ID]

Tax Deduction Information:
The Masumi Hayashi Foundation is a 501(c)(3) nonprofit organization.
EIN: [Your EIN Number]

This donation is tax-deductible to the extent allowed by law. No goods or services were provided in exchange for this contribution.

Please retain this receipt for your tax records.

---

Your support helps preserve and share Masumi Hayashi's pioneering photography and cultural legacy. Thank you for making this work possible.

With gratitude,

Dean Keesey
Director, Masumi Hayashi Foundation
dkeesey@masumihayashi.com
https://masumihayashi.com

---

Masumi Hayashi Foundation
501(c)(3) Nonprofit Organization
EIN: [Your EIN Number]
```

---

## Setup Instructions

### 1. Get Stripe Payment Link (5 minutes)
1. Go to https://dashboard.stripe.com/payment-links
2. Click "New payment link"
3. Set up:
   - **Product**: "Donation to Masumi Hayashi Foundation"
   - **Amount**: "Customer chooses" (let donors pick amount)
   - **Recurring**: Enable monthly option
   - **Tax ID collection**: Enable (for donor info)
   - **Success redirect**: masumihayashi.com/thank-you
4. Copy the Payment Link URL
5. Update `/src/pages/donate.astro` line 5 with your link

### 2. Initial Tax Receipt Process (Manual - 2 minutes per donation)
When Stripe notifies you of a donation:
1. Log into Stripe Dashboard → Payments
2. View payment details
3. Copy donor info (name, email, amount, date, transaction ID)
4. Send the email template above with filled-in details

### 3. Later: Automate with Webhooks + Your CRM
When ready to automate:
- Set up Stripe webhook → your CRM (HubSpot/SQLite/whatever)
- Auto-send tax receipt email
- Track donors for future campaigns
- **Budget: 2-4 hours development time**

---

## What You Get vs DonorBox

**DonorBox** (what you had):
- ❌ Heavy iframe (slow, janky)
- ❌ Their CRM (locked in, can't access)
- ❌ $0 raised in 2+ years
- ❌ Monthly fee for nothing

**Stripe** (what you have now):
- ✅ Clean, fast checkout (Stripe hosted page)
- ✅ YOUR CRM (HubSpot/SQLite/whatever you want)
- ✅ Same fees (2.9% + 30¢) as DonorBox
- ✅ Recurring donations built-in
- ✅ Tax receipts = simple email template
- ✅ Full donor data ownership

---

## Next Steps for Marketing Success

The real problem: **masumihayashifoundation.org doesn't inspire donations**

People don't donate because:
1. Unclear what the foundation does
2. No emotional connection to Masumi's story
3. No specific projects to fund
4. Generic "support our mission" messaging

**Fix this FIRST before worrying about donation platform:**
- Tell Masumi's story compellingly
- Show specific projects donors are funding
- Create urgency (exhibition funding, archive preservation, etc.)
- Use masumihayashi.com (the good site) to drive traffic to donate page

**Task added to tasks.db**: Improve foundation site to make compelling donation case
