#!/bin/bash
# Check deployment status for masumihayashi.com and gallery subdomain

echo "🔍 Checking Masumi Hayashi Deployment Status"
echo "=============================================="
echo ""

echo "1️⃣  Main Domain DNS (masumihayashi.com):"
dig masumihayashi.com +short | head -2
echo ""

echo "2️⃣  Gallery Subdomain DNS (gallery.masumihayashi.com):"
dig gallery.masumihayashi.com +short
echo ""

echo "3️⃣  Main Domain SSL Status:"
curl -sI https://masumihayashi.com/ 2>&1 | grep -E "(HTTP|curl:|SSL)" | head -3
echo ""

echo "4️⃣  Gallery Subdomain SSL Status:"
curl -sI https://gallery.masumihayashi.com/ 2>&1 | grep -E "(HTTP|curl:|SSL)" | head -3
echo ""

echo "✅ Success Criteria:"
echo "  - Both DNS queries return IPs (not NXDOMAIN)"
echo "  - Both SSL tests show 'HTTP/2 200' or redirect"
echo "  - No 'curl: (6)' or 'SSL:' errors"
