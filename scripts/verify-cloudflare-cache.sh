#!/bin/bash
#
# CloudFlare Cache Verification Script
# Purpose: Test if CloudFlare is caching Cloudinary images correctly
#
# Usage: ./scripts/verify-cloudflare-cache.sh

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "========================================="
echo "CloudFlare Cache Verification"
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo "========================================="
echo ""

# Test URLs - using actual Cloudinary URLs from your site
TEST_URLS=(
    "https://masumihayashi.com"
    "https://res.cloudinary.com/masumi-hayashi-foundation/image/upload/bo_30px_solid_black,b_black,c_scale,w_1280/v1/artworks/sample.jpg"
)

echo "Testing cache status for key URLs..."
echo ""

for URL in "${TEST_URLS[@]}"; do
    echo -e "${BLUE}Testing: $URL${NC}"

    # First request (might be MISS)
    echo "  First request:"
    HEADERS1=$(curl -sI "$URL" 2>/dev/null || echo "")

    if echo "$HEADERS1" | grep -i "cf-cache-status" > /dev/null; then
        CACHE_STATUS1=$(echo "$HEADERS1" | grep -i "cf-cache-status" | cut -d' ' -f2 | tr -d '\r')
        echo -e "    Cache Status: ${YELLOW}$CACHE_STATUS1${NC}"
    else
        echo -e "    ${RED}No CloudFlare headers found${NC}"
    fi

    # Wait a moment
    sleep 2

    # Second request (should be HIT)
    echo "  Second request:"
    HEADERS2=$(curl -sI "$URL" 2>/dev/null || echo "")

    if echo "$HEADERS2" | grep -i "cf-cache-status" > /dev/null; then
        CACHE_STATUS2=$(echo "$HEADERS2" | grep -i "cf-cache-status" | cut -d' ' -f2 | tr -d '\r')

        if [ "$CACHE_STATUS2" == "HIT" ]; then
            echo -e "    Cache Status: ${GREEN}$CACHE_STATUS2 ✓${NC}"
        else
            echo -e "    Cache Status: ${YELLOW}$CACHE_STATUS2${NC}"
        fi
    else
        echo -e "    ${RED}No CloudFlare headers found${NC}"
    fi

    # Show CF-RAY (confirms CloudFlare is serving)
    if echo "$HEADERS2" | grep -i "cf-ray" > /dev/null; then
        CF_RAY=$(echo "$HEADERS2" | grep -i "cf-ray" | cut -d' ' -f2 | tr -d '\r')
        echo -e "    CF-Ray: ${GREEN}$CF_RAY (CloudFlare is serving)${NC}"
    fi

    echo ""
done

echo "========================================="
echo "Cache Status Meanings:"
echo "========================================="
echo "  HIT       = Served from CloudFlare cache (good!)"
echo "  MISS      = First request, fetching from origin"
echo "  EXPIRED   = Cache expired, fetching fresh copy"
echo "  BYPASS    = Not cacheable (needs Page Rule)"
echo "  DYNAMIC   = Dynamic content (can't cache)"
echo ""

echo "========================================="
echo "What to Look For:"
echo "========================================="
echo "✓ Second requests should show 'HIT'"
echo "✓ CF-Ray header confirms CloudFlare is active"
echo "✓ After 24 hours, cache hit rate should be >85%"
echo ""

echo "Monitor CloudFlare Dashboard:"
echo "https://dash.cloudflare.com/a5d1bedf3a206d66f04a37fade34c1f0/masumihayashi.com/caching/overview"
echo ""
