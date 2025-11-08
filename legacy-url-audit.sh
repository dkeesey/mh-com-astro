#!/bin/bash
# Comprehensive legacy URL scraper for masumihayashi.com
# Crawls localhost:8085 to find all unique HTML pages

echo "🔍 Scraping Legacy Masumi Hayashi Site (localhost:8085)"
echo "========================================================"
echo ""

# Create temp file for all URLs
TEMP_FILE=$(mktemp)

# Function to extract URLs from a page
scrape_page() {
    local url=$1
    echo "📄 Scraping: $url"
    curl -s "$url" | grep -o 'href="[^"]*\.html"' | sed 's/href="//; s/"$//' | while read -r link; do
        # Normalize URLs
        if [[ $link == /* ]]; then
            echo "http://localhost:8085$link"
        elif [[ $link == html/* ]]; then
            echo "http://localhost:8085/$link"
        elif [[ $link != http* ]]; then
            echo "http://localhost:8085/html/$link"
        fi
    done >> "$TEMP_FILE"
}

# Start with homepage
scrape_page "http://localhost:8085/"

# Get unique /html/ paths and scrape each
PAGES=$(curl -s http://localhost:8085/ | grep -o 'href="[^"]*\.html"' | sed 's/href="//; s/"$//' | grep "^/\?html/" | sort -u)

for page in $PAGES; do
    if [[ $page == /* ]]; then
        scrape_page "http://localhost:8085$page"
    else
        scrape_page "http://localhost:8085/$page"
    fi
done

# Get unique URLs
echo ""
echo "📋 ALL UNIQUE HTML PAGES FOUND:"
echo "================================"
sort -u "$TEMP_FILE" | sed 's|http://localhost:8085||' | grep "\.html$" | sort

echo ""
echo "📊 TOTAL UNIQUE PAGES: $(sort -u "$TEMP_FILE" | grep "\.html$" | wc -l | tr -d ' ')"

rm "$TEMP_FILE"
