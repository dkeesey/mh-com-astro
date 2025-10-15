#!/bin/bash
#
# Cloudinary Usage Monitor - Weekly Bandwidth Check
# Purpose: Check Cloudinary bandwidth usage and alert if approaching free tier limit
#
# Usage: ./scripts/check-cloudinary-usage.sh
# Frequency: Run weekly (every Monday)
#
# Alert Thresholds:
# - Green: <15GB (safe)
# - Yellow: 15-20GB (review CloudFlare implementation)
# - Orange: 20-25GB (implement CloudFlare within 48 hours)
# - Red: >25GB (emergency - overage charges)

set -e

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
ORANGE='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "========================================="
echo "Cloudinary Usage Report"
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo "========================================="
echo ""

# Get usage data
USAGE_JSON=$(cld admin usage)

# Parse JSON (using python for reliable JSON parsing)
BANDWIDTH_GB=$(echo "$USAGE_JSON" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['bandwidth']['usage'] / 1073741824)")
STORAGE_GB=$(echo "$USAGE_JSON" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['storage']['usage'] / 1073741824)")
CREDITS_USED=$(echo "$USAGE_JSON" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['credits']['usage'])")
CREDITS_LIMIT=$(echo "$USAGE_JSON" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['credits']['limit'])")
CREDITS_PERCENT=$(echo "$USAGE_JSON" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['credits']['used_percent'])")
PLAN=$(echo "$USAGE_JSON" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['plan'])")
LAST_UPDATED=$(echo "$USAGE_JSON" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['last_updated'])")

# Display usage
echo "Plan: $PLAN"
echo "Last Updated: $LAST_UPDATED"
echo ""
echo "Current Usage:"
echo "  Bandwidth: ${BANDWIDTH_GB} GB / 25 GB"
echo "  Storage:   ${STORAGE_GB} GB"
echo "  Credits:   ${CREDITS_USED} / ${CREDITS_LIMIT} (${CREDITS_PERCENT}%)"
echo ""

# Calculate bandwidth status
BANDWIDTH_INT=$(echo "$BANDWIDTH_GB" | awk '{print int($1+0.5)}')

if [ "$BANDWIDTH_INT" -lt 15 ]; then
    echo -e "${GREEN}✓ Status: GREEN - Safe${NC}"
    echo "  Action: Continue monitoring weekly"
elif [ "$BANDWIDTH_INT" -lt 20 ]; then
    echo -e "${YELLOW}⚠ Status: YELLOW - Elevated${NC}"
    echo "  Action: Review CloudFlare implementation within 2 weeks"
    echo "  Guide: CLOUDFLARE-SETUP-GUIDE.md"
elif [ "$BANDWIDTH_INT" -lt 25 ]; then
    echo -e "${ORANGE}⚠⚠ Status: ORANGE - High${NC}"
    echo "  Action: Implement CloudFlare within 48 hours"
    echo "  Guide: CLOUDFLARE-SETUP-GUIDE.md"
else
    echo -e "${RED}🚨 Status: RED - CRITICAL${NC}"
    echo "  Action: EMERGENCY - Implement CloudFlare immediately"
    echo "  Emergency: See CLOUDINARY-COST-RISK-MANAGEMENT.md Phase 4"
fi

echo ""

# Calculate projected monthly usage (if >5 days into month)
DAY_OF_MONTH=$(date '+%d')
if [ "$DAY_OF_MONTH" -gt 5 ]; then
    PROJECTED=$(echo "$BANDWIDTH_GB $DAY_OF_MONTH" | awk '{printf "%.1f", ($1 / $2) * 30}')
    echo "Projected Monthly: ${PROJECTED} GB"

    PROJECTED_INT=$(echo "$PROJECTED" | awk '{print int($1+0.5)}')
    if [ "$PROJECTED_INT" -gt 20 ]; then
        echo -e "${ORANGE}⚠ Projected usage >20GB - Consider CloudFlare${NC}"
    fi
fi

echo ""
echo "========================================="
echo "Monitoring URLs:"
echo "  Console: https://cloudinary.com/console/usage"
echo "  CloudFlare Guide: CLOUDFLARE-SETUP-GUIDE.md"
echo "  Risk Management: CLOUDINARY-COST-RISK-MANAGEMENT.md"
echo "========================================="
echo ""

# Log to file
LOG_DIR="/Users/deankeesey/Workspace/today/maintenance"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/cloudinary-usage-$(date '+%Y-%m').log"

echo "$(date '+%Y-%m-%d %H:%M:%S') | Bandwidth: ${BANDWIDTH_GB} GB | Storage: ${STORAGE_GB} GB | Credits: ${CREDITS_PERCENT}%" >> "$LOG_FILE"

echo "✓ Usage logged to: $LOG_FILE"
