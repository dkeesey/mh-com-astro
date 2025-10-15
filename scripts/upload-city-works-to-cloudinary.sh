#!/bin/bash

# City Works Images - Bulk Upload to Cloudinary
# Uploads all 22 missing City Works images to Cloudinary
# Organizes in: masumi-hayashi-foundation/city-works/

set -e  # Exit on error

# Cloudinary credentials
export CLOUDINARY_CLOUD_NAME="masumi-hayashi-foundation"
export CLOUDINARY_API_KEY="219814145647697"
export CLOUDINARY_API_SECRET="p5SMG76d957fUf-hxDtMJv1vnjo"

# Source directory
SOURCE_DIR="/Volumes/PRO-G40/MH-imageprocessing/all-images-processed"

# Output mapping file
MAPPING_FILE="/Users/deankeesey/Workspace/dk-sites/docs/masumi/canonical-content/artworks/city-works/cloudinary-mapping.json"

echo "=========================================="
echo "City Works Images - Cloudinary Upload"
echo "=========================================="
echo "Cloud: $CLOUDINARY_CLOUD_NAME"
echo "Source: $SOURCE_DIR"
echo "Folder: city-works/"
echo "=========================================="
echo ""

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Error: Source directory not found: $SOURCE_DIR"
    exit 1
fi

# Check if Claude Code MCP can upload (we'll use it via Node.js script)
echo "✅ Cloudinary credentials configured"
echo ""

# Create mapping file header
cat > "$MAPPING_FILE" << 'EOF'
{
  "uploaded": [],
  "errors": [],
  "timestamp": ""
}
EOF

echo "📋 Image Upload List (22 images):"
echo ""
echo "Cleveland Works (10):"
echo "  1. cleveland-stadium.jpg"
echo "  2. cultural-gardens-lithuanian.jpg"
echo "  3. cultural-gardens-yugoslavian.jpg"
echo "  4. cultural-gardens-hebrew.jpg"
echo "  5. main-avenue-bridge.jpg"
echo "  6. palace-theater.jpg"
echo "  7. public-square-night.jpg"
echo "  8. w-25th-street-station.jpg"
echo "  9. sutro-baths-cliff-view.jpg"
echo " 10. angel-island-immigration-station.jpg"
echo ""
echo "California Works (5):"
echo " 11. big-sur-2.jpg"
echo " 12. dry-river.jpg"
echo " 13. los-angeles-subway-1.png (will convert to JPG)"
echo " 14. los-angeles-subway-2.jpg"
echo " 15. watts-towers.jpg"
echo ""
echo "Out-of-State Works (7):"
echo " 16. dealey-plaza.jpg"
echo " 17. philadelphia-downtown.jpg"
echo " 18. pittsburgh-plate-glass.png (will convert to JPG)"
echo " 19. wall-street.jpg"
echo " 20. union-terminal.jpg"
echo " 21. roman-baths.jpg"
echo " 22. case-western-gehry.jpg"
echo ""
echo "=========================================="
echo ""
echo "⚠️  MANUAL UPLOAD REQUIRED"
echo ""
echo "This script prepares the upload but requires Claude Code MCP"
echo "to actually perform the uploads."
echo ""
echo "Next step: Run the Node.js upload script that uses MCP tools"
echo ""

exit 0
