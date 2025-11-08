# DreamHost LAMP Migration Plan for masumimuseum.com

## Strategy Overview
Create fresh DreamHost user with clean LAMP stack to host the legacy masumimuseum.com site (CodeIgniter 3 + static HTML hybrid).

## Pre-Migration Analysis
✅ **Site Structure Identified:**
- Hybrid: Static HTML + CodeIgniter 3 (2011)
- Entry point: `index.html` → redirects to `index.php`
- PHP includes for header/navigation
- Legacy table-based layout with 2011-era styling
- Key reference to new site: Links to masumihayashi.com

## DreamHost Setup Steps

### 1. Create New DreamHost User
```
User: masumimuseum
Domain: masumimuseum.com
Plan: Shared hosting (sufficient for CI3)
```

### 2. PHP Configuration Requirements
```
PHP Version: 7.4 or 8.0 (CI3 compatible)
Extensions needed:
- mysqli
- curl
- gd
- mbstring
```

### 3. File Upload Strategy
```bash
# Create deployment package (run locally)
cd /Users/deankeesey/Workspace/dk-sites/masumimuseum-legacy
tar -czf masumimuseum-dreamhost.tar.gz \
  --exclude='.git' \
  --exclude='docker*' \
  --exclude='*.json' \
  --exclude='screenshots' \
  --exclude='api' \
  --exclude='lightsail*' \
  application/ \
  css/ \
  images/ \
  js/ \
  php/ \
  system/ \
  index.html \
  index.php \
  .htaccess
```

### 4. DreamHost Directory Structure
```
/home/masumimuseum/masumimuseum.com/
├── application/          # CI3 application
├── system/              # CI3 system files
├── css/                 # Site styles
├── images/              # Gallery images
├── js/                  # JavaScript
├── php/                 # PHP includes
├── index.html           # Entry point
├── index.php            # CI3 bootstrap
└── .htaccess            # URL rewriting
```

### 5. Database Setup (if needed)
```sql
-- Check if CI3 uses database
-- If yes, create MySQL database via DreamHost panel
CREATE DATABASE masumimuseum_db;
```

### 6. Configuration Updates for DreamHost
```php
// application/config/config.php adjustments:
$config['base_url'] = 'https://masumimuseum.com/';
$config['permitted_uri_chars'] = 'a-z 0-9~%.:_\\-/';

// Update any hardcoded paths for shared hosting
```

## Testing Checklist
- [ ] Homepage loads (index.html → index.php redirect)
- [ ] Navigation menu works
- [ ] Image gallery displays
- [ ] PHP includes function correctly
- [ ] .htaccess rewriting works
- [ ] Links to masumihayashi.com work

## Benefits of This Approach
✅ **Clean Environment:** No contamination from walt-opie issues
✅ **Native PHP:** Shared hosting handles CI3 naturally
✅ **Cost Effective:** Standard DreamHost shared hosting
✅ **Familiar Platform:** You know DreamHost management
✅ **Quick Deploy:** Simple file upload, no containers

## Rollback Plan
If issues arise, we can quickly:
1. Point DNS back to emergency redirect page
2. Fix issues on staging subdomain first
3. Use masumihayashi.com redirects as fallback

## Next Steps
1. Create new DreamHost user account
2. Upload files via FTP/SFTP
3. Configure PHP settings if needed
4. Test all functionality
5. Update DNS once confirmed working

This approach leverages DreamHost's native LAMP stack instead of fighting with modern containerized hosting for 2011-era code.