#!/bin/bash
#
# CloudFlare Cache Configuration Script
# Purpose: Configure aggressive caching for Cloudinary images and static assets
#
# Usage: ./scripts/configure-cloudflare-caching.sh
#
# Requirements:
# - CLOUDFLARE_API_TOKEN environment variable
# - CLOUDFLARE_ZONE_ID environment variable

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "========================================="
echo "CloudFlare Cache Configuration"
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo "========================================="
echo ""

# Load credentials from environment or use defaults
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN:-uNTlRbYe05-3NEbTlhrWxZE2hYhuue8eHq3HGkMn}"
CLOUDFLARE_ZONE_ID="${CLOUDFLARE_ZONE_ID:-86957c3a3b83ea6e29d78b8698056dac}"

if [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_ZONE_ID" ]; then
    echo -e "${RED}Error: Missing credentials${NC}"
    echo "Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID environment variables"
    exit 1
fi

echo "Zone: masumihayashi.com"
echo "Zone ID: $CLOUDFLARE_ZONE_ID"
echo ""

# Function to check existing cache rules
check_existing_rules() {
    echo -e "${BLUE}Checking existing cache rules...${NC}"

    EXISTING_RULES=$(curl -s -X GET \
        "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/rulesets" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json")

    echo "$EXISTING_RULES" | python3 -m json.tool
    echo ""
}

# Function to create cache rule for Cloudinary images
create_cloudinary_cache_rule() {
    echo -e "${BLUE}Creating cache rule for Cloudinary images...${NC}"

    RULE_DATA=$(cat <<'EOF'
{
  "description": "Cache Cloudinary images aggressively",
  "expression": "(http.request.uri.path contains \"res.cloudinary.com/masumi-hayashi-foundation\" or http.request.full_uri contains \"res.cloudinary.com/masumi-hayashi-foundation\")",
  "action": "set_cache_settings",
  "action_parameters": {
    "cache": true,
    "edge_ttl": {
      "mode": "override_origin",
      "default": 31536000
    },
    "browser_ttl": {
      "mode": "override_origin",
      "default": 31536000
    }
  }
}
EOF
)

    RESULT=$(curl -s -X POST \
        "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/rulesets/phases/http_request_cache_settings/entrypoint" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$RULE_DATA")

    if echo "$RESULT" | grep -q '"success":true'; then
        echo -e "${GREEN}✓ Cloudinary cache rule created successfully${NC}"
    else
        echo -e "${YELLOW}⚠ Rule might already exist or needs adjustment${NC}"
        echo "$RESULT" | python3 -m json.tool
    fi
    echo ""
}

# Function to set cache level to aggressive
set_cache_level() {
    echo -e "${BLUE}Setting cache level to 'Cache Everything'...${NC}"

    RESULT=$(curl -s -X PATCH \
        "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/settings/cache_level" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"value":"aggressive"}')

    if echo "$RESULT" | grep -q '"success":true'; then
        echo -e "${GREEN}✓ Cache level set to aggressive${NC}"
    else
        echo -e "${YELLOW}⚠ Cache level might already be set${NC}"
    fi
    echo ""
}

# Function to enable Always Online
enable_always_online() {
    echo -e "${BLUE}Enabling Always Online...${NC}"

    RESULT=$(curl -s -X PATCH \
        "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/settings/always_online" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"value":"on"}')

    if echo "$RESULT" | grep -q '"success":true'; then
        echo -e "${GREEN}✓ Always Online enabled${NC}"
    else
        echo -e "${YELLOW}⚠ Always Online might already be enabled${NC}"
    fi
    echo ""
}

# Function to set browser cache TTL
set_browser_cache_ttl() {
    echo -e "${BLUE}Setting browser cache TTL to 4 hours...${NC}"

    RESULT=$(curl -s -X PATCH \
        "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/settings/browser_cache_ttl" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"value":14400}')

    if echo "$RESULT" | grep -q '"success":true'; then
        echo -e "${GREEN}✓ Browser cache TTL set to 4 hours${NC}"
    else
        echo -e "${YELLOW}⚠ Browser cache TTL might already be set${NC}"
    fi
    echo ""
}

# Main execution
echo "========================================="
echo "Step 1: Check Existing Rules"
echo "========================================="
check_existing_rules

echo "========================================="
echo "Step 2: Create Cloudinary Cache Rule"
echo "========================================="
create_cloudinary_cache_rule

echo "========================================="
echo "Step 3: Set Cache Level"
echo "========================================="
set_cache_level

echo "========================================="
echo "Step 4: Enable Always Online"
echo "========================================="
enable_always_online

echo "========================================="
echo "Step 5: Set Browser Cache TTL"
echo "========================================="
set_browser_cache_ttl

echo "========================================="
echo -e "${GREEN}Configuration Complete!${NC}"
echo "========================================="
echo ""
echo "Next Steps:"
echo "1. Wait 5-10 minutes for CloudFlare to propagate settings"
echo "2. Test cache with: ./scripts/verify-cloudflare-cache.sh"
echo "3. Monitor cache hit rate in CloudFlare dashboard"
echo ""
echo "Expected Results:"
echo "- Cache hit rate: >85% after 24 hours"
echo "- Cloudinary bandwidth: 70-90% reduction"
echo "- Page load time: 10-30% faster"
echo ""
echo "Verification:"
echo "- CloudFlare Dashboard: https://dash.cloudflare.com"
echo "- Cloudinary Usage: https://cloudinary.com/console/usage"
echo ""
